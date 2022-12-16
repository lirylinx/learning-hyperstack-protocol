const Hyperswarm = require('hyperswarm');
const swarm = new Hyperswarm();
const topico = Buffer.from('4ccc861b918304f41083997311c9cd639ba646fe1af1592658927f6606cf1a30', 'hex');

// Entrar na rede usando uma chave ou topico

swarm.join(topico);

// Evento 'connection' eh disparado toda vez que um par eh encontrado e conectado usando a mesma chave de descoberta
swarm.on('connection', function ( socket, info) {
    // 'info' eh um simples objecto que descreve o par que estamos conectado
    console.log('Par encontrado:', info);
    
    // 'socket' eh fluxo duplex que le e escreve ex:
    process.stdin.pipe(socket).pipe(process.stdout)
});