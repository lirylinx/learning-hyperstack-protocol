const { Client } = require('hyperspace');
const Hyperbee = require('hyperbee');


const listData = [
    { key: 'foo', value: 'foo-value' },
{ key: 'bar', value: 'bar-value' },
{ key: 'baz', value: 'baz-value' },
]

start();

async function start() {

    const { corestore, replicate } = new Client();

    const store = corestore();
    const core = store.get({name: 'hyperbee-exercicio'});
    const db = new Hyperbee(core, {keyEncoding: 'utf-8', valueEncoding: 'utf-8'});

    // for ( data of listData ) {
    //   const rv=   await insertData(data.key, data.value);
    await db.put(listData[0].key, listData[0].value);
    
    const { value } = await db.get(data.key);

      console.log('Inserido: %s', value);
    }


    // async function insertData(key, val) {
    //     await db.put(key, val)
    
    //     const { value } = await db.get(key);
    //     return value;
    // }



