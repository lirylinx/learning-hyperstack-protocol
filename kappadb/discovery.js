const Hyperswarm = require('hyperswarm');
const swarm = new Hyperswarm();
const topico = Buffer.from('a49766a23610999dc5dfe05bc37cd98a9911d4b46bd25fc2cd037b9669a1e214', 'hex');

// Entrar na rede usando uma chave ou topico

swarm.join(topico);

// Evento 'connection' eh disparado toda vez que um par eh encontrado e conectado usando a mesma chave de descoberta
swarm.on('connection', function ( socket, info) {
    // 'info' eh um simples objecto que descreve o par que estamos conectado
    console.log('Par encontrado:', info);
    
    // 'socket' eh fluxo duplex que le e escreve ex:
    process.stdin.pipe(socket).pipe(process.stdout)
});