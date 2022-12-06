const { Client } = require('hyperspace');


start();

async function start() {
    const c = new Client();

    // Consultar o estado do servidor RPC para verificar se esta funcionando
    console.log(await c.status());
}