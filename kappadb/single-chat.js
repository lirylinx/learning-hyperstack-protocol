const hypercore = require('hypercore');


const feed = hypercore('./single-chat-feed', {
    valueEncoding: 'json'
});



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