const { Client } = require('hyperspace');

 main('ece8bf4002d73b395a28c7d624e68ec5c33aa057bb1c3c4fe6cbda750b090174');

async function main(keyStr) {
    const c = new Client();
    const store = c.corestore();
    const core = store.get(keyStr, {valueEncoding: 'json'});

    await core.ready();
    console.log(core.key.toString('hex'));


    core.on('append',  async function () {
        // novo bloco de dados foi adicionado
        console.log('bloco #' + (core.length - 1))
        console.log( await core.get(core.length - 1));

    });
}
