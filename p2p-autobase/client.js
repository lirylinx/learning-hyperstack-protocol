import DHT from '@hyperswarm/dht'

const node = new DHT();
const keyStr = '0b55d0f54e17a583b30f9ff85ec6e912c4ce6f2177202b1d7c4f23411e97617b';
const remotePublicKey = Buffer.from(keyStr, 'hex');
const encrypedSocket = node.connect(remotePublicKey);

encrypedSocket.on('open', function () {
    console.log('conectado ao servidor');
});

encrypedSocket.on('data', function (data) {
    console.log('Remoto disse:', data.toString());
});