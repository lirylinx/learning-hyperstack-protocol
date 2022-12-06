const { Client } = require('hyperspace');

start();

async function start() {
    const c = new Client();
    const store = c.corestore();

    // core eh uma instancia hypercore
    const core = store.get({name: 'exercicio-02'});

    // Esperar o estado interno seja carregado
    await core.ready();

    await core.append('block #' + core.length);

    for ( let i = 0; i < core.length; i++) {
        console.log(await core.get(i, { valueEncoding: 'utf-8'}));
    }


}