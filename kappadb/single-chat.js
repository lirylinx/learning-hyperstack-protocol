const hypercore = require('hypercore');
const Hyperswarm = require('hyperswarm')
const pump = require('pump')

const feed = hypercore('./single-chat-feed', {
    valueEncoding: 'json'
});

const swarm = new Hyperswarm();


feed.ready(function () {
    console.log('public key:', feed.key.toString('hex'))
    console.log('discovery key:', feed.discoveryKey.toString('hex'))
    console.log('secret key:', feed.secretKey.toString('hex'))
  })

process.stdin.on('data', function ( data ) { 
    
 feed.append({
    type: 'chat-message',
    nickname: 'cat-lover',
    text: data.toString().trim(),
    timestamp: new Date().toISOString()
},  function ( err, seq) {
    if ( err ) throw err;
    console.log('Dados anexados como entrada #' + seq);
    
}
)
})


feed.createReadStream({ live: true })
    .on('data', function ( data ) {
        console.log('<%s> %s: %s ', data.timestamp, data.nickname, data.text);
    
    });



    feed.ready(function () {
        // we use the discovery as the topic
        swarm.join(feed.discoveryKey)
        console.log(feed.discoveryKey.toString('hex'))
        swarm.on('connection', function (socket, info) {
          console.log('(New peer connected!)')
      
          // We use the pump module instead of stream.pipe(otherStream)
          // as it does stream error handling, so we do not have to do that
          // manually.
      
          // See below for more detail on how this work.
          pump(socket, feed.replicate(info.client, { live: true }), socket)
        })
      })