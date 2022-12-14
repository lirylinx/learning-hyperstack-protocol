const hypercore = require('hypercore');


const feed = hypercore('./single-chat-feed', {
    valueEncoding: 'json'
});

 feed.append({
    type: 'chat-message',
    nickname: 'cat-lover',
    text: 'Ola Mundo',
    timestamp: new Date(Date.now())
},  function ( err, seq) {
    if ( err ) throw err;
    console.log('Dados anexados como entrada #' + seq);
    feed.get(seq, function( err, msg) {
        console.log('msg', msg)
    });
    
}
)

