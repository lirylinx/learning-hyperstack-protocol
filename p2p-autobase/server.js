import DHT from '@hyperswarm/dht'


// Criar um nó Hyperswarm DHT que se conecta à rede global.
const node = new DHT();



const server = node.createServer(function (encrypedSocket){


    // chamado quando uma nova conexao eh criado
    console.log('Nova conexao de:', encrypedSocket.remotePublicKey.toString('hex'));
    encrypedSocket.write('Ola Mundo');
    encrypedSocket.end();
});

const keyPair = DHT.keyPair();
await  server.listen(keyPair);

// Servidor agora escutando
console.log('Conectar a:');
console.log(keyPair.publicKey.toString('hex'));