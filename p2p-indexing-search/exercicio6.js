const { Client } = require('hyperspace');


const STATS_CORE_KEY = '3d82710ebcec2c475f5ee0cea6e77f390c7c11906bf27dd44bfa24679843ab19';

// ajustar o tempo quando necessario. Isso consultará as estatísticas coletadas 10 minutos atrás.
const TARGET = new Date(Date.now() - (60 * 1e2));


// Alternar o comportamento da busca com algoritmo diferentes
const PREFETCH = true;
const NAIVE_MODE = false;

start();


async function start () {
    const { corestore, network, replicate } = new Client();
    const store = corestore();

    // Obter a estatica no core
    const statsCore = store.get({key: STATS_CORE_KEY, valueEncoding: 'json'});

    // Conectar a estatica do core na rede
    await replicate(statsCore);

    let blockDownnloaded = 0;
    statsCore.on('download', () => {
        blockDownnloaded++;
    });

    setInterval(() => {
        console.log('Blocos Baixados:', blockDownnloaded)
    }, (2000));

    const algoritmo = NAIVE_MODE ? naiveClosestStats : bisectClosestStats;

    // Se PREFETCH for true, o Core sera marcado para download paralelo
    if ( PREFETCH ) statsCore.download();

    const closestStats = await algoritmo(statsCore, TARGET);

    if (!closestStats) {
        console.log('Nenhum estatisca encontrada para o tempo dado');
    } else {
        console.log('Estatistica encontrada:', closestStats);
    }

}


async function naiveClosestStats(core, target) {
    for ( let i = 0; i < core.length - 1; i++ ) {
        const block = await core.get(i);
        if ( new Date(block.timestamp) >= target) return block;
    }

    return null;
}

async function getClosestStatsBisect(core, target) {
    return bisect(core, target, {
        get: idx => core.get(idx),
        map: block => block.timestamp
    });
}

async function bisectClosestStats(core, target) {

    let lower = 0;
    let upper = core.length;

    while ( lower < upper) {
        const mid = Math.floor((upper + lower ) / 2);

        // Esses operadores terciários nos permitem testar facilmente com Arrays primeiro.
        const block = await core.get(mid);
        const date = new Date(block.timestamp);

        if ( date < target ) lower = mid + 1
        else upper = mid
    }

    return core.get(lower);

}