const { Client } = require('hyperspace');
const top = require('process-top')();



const STATS_CORE_KEY = 'ebcd9b99efb4ba8661076dd7e7a886cc5380a3f5998f16bfeeaaecfe0885de4a'
const TARGET = '2020-11-03T23:00:02.700Z'


start();

async function start() {
    const { corestore } = new Client();
    const store = corestore();

    // const core = store.get({key: STATS_CORE_KEY, valueEncoding: 'json'});
    const core = store.get({name: 'stats-index', valueEncoding: 'json'});

    await core.ready();

    setInterval(async () => {
        const stats = top.toJSON();
        const index = await buildNextIndex(core);
        core.append({stats, index}).catch(err => console.error('Nao foi possivel anexar os dados'));
    }, 500);

    console.log('Esperando 5s para mais dados sejam anexados');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Obter a estatisca de 2.5 segundos atras
    //const target = (new Date(Date.now() - (2.5 * 1e3))).toISOString();
    const stats = await findClosest(core, TARGET);
    console.log(`Stats de ${TARGET}`, stats);
}


async function createDataset(core, pairs) {
    let idx = 0;
    for ( const pair in pairs) {
        const index = await buildNextIndex(core);
        await core.append({
            index,
            value: pair
        });
    }
}


async function findClosest(core, key) {

    if (!core.length) return null;
    let latest = await core.get(core.length - 1)
    return moveCloser();

    async function moveCloser() {
        let closest = closestBlock(key, latest);
        if ( closest === -1) return latest;
        latest = await core.get(closest);
        return moveCloser();
    }

}

function closestBlock(timestamp, block) {
    if (!block.index.length) return -1;

    for ( let i = 0; i < block.index.length; i++) {
        if ( block.index[i].timestamp < timestamp ) {
            if ( i === 0 ) return -1;
            return block.index[i - 1].blockIndex;
        }
    }

    return block.index[block.index.length - 1].blockIndex;
}


async function buildNextIndex(core) {
    const JUMP_FACTOR = 2;

    const index = [];
    let distance = 1;
    let nextBlockIndex = core.length;

    while ( nextBlockIndex - distance >= 0) {
        const blockIndex = nextBlockIndex - distance;
        const block = await core.get(blockIndex);

        index.push({
            timestamp: block.stats.timestamp,
            blockIndex
        });

        distance *= JUMP_FACTOR;
    }

    return index;
}
