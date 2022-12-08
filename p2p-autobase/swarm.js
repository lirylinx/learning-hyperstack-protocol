import Hyperswarm from 'hyperswarm';
import crypto from 'crypto';

const swarm = new Hyperswarm();

// Swarms abstraem servidores e clientes e apenas fornecem conexões
swarm.on('connection', function ( encrypedSocket){
    console.log('Nova conexao de: ', encrypedSocket.remotePublicKey.toString('hex'));

    encrypedSocket.write('Ola Mundo');

    encrypedSocket.on('data', function (data) {
        console.log('Peer remoto disse: ', data.toString());
    });

    encrypedSocket.on('error', function ( err ) {
        confirm.log('Peer remoto com erro: ', err);
    });

    encrypedSocket.on('close', function () {
        console.log('Peer remoto desconectado')
    });

    process.stdin.pipe(encrypedSocket).pipe(process.stdout);
});


//  Tópicos são apenas identificadores para encontrar outros pares na rede
const topico = crypto.createHash('sha256').update('topico').digest();
swarm.join(topico);

console.log("Executando...")