const { Client } = require('hyperspace');

 main('3d82710ebcec2c475f5ee0cea6e77f390c7c11906bf27dd44bfa24679843ab19');

async function main(keyStr) {
    const {corestore, replicate } = new Client();
    const store = corestore();
    const core = store.get(keyStr, {valueEncoding: 'json'});

    await replicate(core);

    console.log(core.key.toString('hex'));


  
      // Print the last block from the stats core.



    core.on('download',  async function () {
      console.log('event')

      const lastBlock = await core.get(core.length - 1)
      console.log(lastBlock)
    });

    // core.download();
    const lastBlock = await core.get(5)
    console.log(lastBlock)
}
