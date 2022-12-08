import Corestore from "corestore";
import Hyperswarm from "hyperswarm";

const store = new Corestore('./peer-store');
const swarm = new Hyperswarm();

// Configurar a replicacao do corestore
swarm.on('connection', (connection) => store.replicate(connection));

// Carregar o core pela chave publica
const core = store.get(Buffer.from('8e80743194161bc239c1e6e7973a279161c7e8e78648509c073bc37e02012770', 'hex'));

await core.ready();

// Juntar-se ao DiscoveryKey do Hypercore (um hash de sua chave pública)
swarm.join(core.discoveryKey);

// Certificar-se de que ha todas conexoes
await swarm.flush();

// Certificar-se de que ha comprimento mais recente

console.log('Core length eh ', core.length);