const Hyperbee = require('hyperbee');
const { Client } = require('hyperspace')

start();

async function start() {

    const { corestore, replicate } = new Client();
    const store = corestore();
    const feed = store.get({name: 'hyperbee-exercicio'});

    const db = new Hyperbee(feed, {keyEncoding: 'utf-8', valueEncoding: 'utf-8'});    
    await db.ready();

    await db.put('key', 'value');
    console.log(db.get('key'));
}