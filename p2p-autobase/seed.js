import Corestore from "corestore";
import Hyperswarm from "hyperswarm";

const store = new Corestore('./seed-store');
const swarm = new Hyperswarm();

// Configurar a replicação do corestore

swarm.on('connection', (connection) => store.replicate(connection));

// Carregar o core pelo nome
const core = store.get({name: 'seeding-core'});

// Certificar-se de que o comprimento está carregado
await core.ready();

// Juntar-se ao DiscoveryKey do Hypercore (um hash da chave pública)
swarm.join(core.discoveryKey);

// Inserir 10000 blocos

while ( core.length < 10000) {
    await core.append(Buffer.from('Bloco #' + core.length + ' - ' +  new Date(Date.now)));
}

console.log('Core chave public eh: ' + core.key.toString('hex'));