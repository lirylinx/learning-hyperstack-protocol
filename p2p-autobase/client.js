import DHT from '@hyperswarm/dht'

const node = new DHT();
const keyStr = '218951da7ad4caeed7f63d7b7717661ac5377b123135ebccb8bfcd41d4040296';
const remotePublicKey = Buffer.from(keyStr, 'hex');
const encrypedSocket = node.connect(remotePublicKey);

encrypedSocket.on('open', function () {
    console.log('conectado ao servidor');
});

encrypedSocket.on('data', function (data) {
    console.log('Remoto disse:', data.toString());
});