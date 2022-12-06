const { Client } = require('hyperspace');
const stats = require('process-top')(); // instanciar como coletor de estatistica

main();

async function main() {
    const c = new Client();
    const store = c.corestore();

    const core = store.get({name: 'stats-colletor', valueEncoding: 'json'});

    // esperar o estado interno esteja carregado
    await core.ready();
    
    setInterval(() => {
        
        core.append(stats.toJSON()).catch(err => console.error('Nao foi possivel anexar os dados: \n' + err));
    }, 5000);

    core.on('append',  async function () {
        // novo bloco de dados foi adicionado
        console.log( await core.get(core.length - 1));

    });
}