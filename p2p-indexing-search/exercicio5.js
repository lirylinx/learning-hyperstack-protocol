const { Client } = require('hyperspace');

 main('ece8bf4002d73b395a28c7d624e68ec5c33aa057bb1c3c4fe6cbda750b090174');

async function main(keyStr) {
    const {corestore, replicate } = new Client();
    const store = corestore();
    const core = store.get(keyStr, {valueEncoding: 'json'});

    await replicate(core);

    console.log(core.key.toString('hex'));


  
      // Print the last block from the stats core.
  const lastBlock = await core.get(core.length - 1)
  console.log(lastBlock)

    // core.on('append',  async function () {
    //     // novo bloco de dados foi adicionado
    //     console.log( await core.get(core.length - 1));

    // });
}
