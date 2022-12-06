const { Client } = require('hyperspace');
const stats = require('process-top')(); // instanciar como coletor de estatistica

main();

async function main() {
    const { corestore, replicate } = new Client();
    const store = corestore();

    const core = store.get({name: 'stats-colletor', valueEncoding: 'json'});

    // esperar o estado interno esteja carregado
    await core.ready();
    console.log('Chave public: ' + core.key.toString('hex')); 

    await replicate(core);

    
    setInterval(() => {
        
        core.append(stats.toJSON()).catch(err => console.error('Nao foi possivel anexar os dados: \n' + err));
    }, 5000);

    core.on('append',  async function () {
        // novo bloco de dados foi adicionado
        console.log('bloco #' + (core.length - 1).toString())

    });
}