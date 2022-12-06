const { Client: HyperspaceClient } = require('hyperspace');
const hyperdrive = require('hyperdrive');


async function main (keyStr) {

try {
    
    

    const key = Buffer.from(keyStr, 'hex'); // A chave deve ser convertida de string para buffer binario
    const client = new HyperspaceClient(); // Criar uma instancia do cliente hyperspace (daemon)

    // Criar uma instancia do hyperdrive para acesso 
    // aos ficheiros armazenados no hyperspace (corestore)
    // Param: 1 local de armazenamento, 2 chave do hyperdrive 
    const drive = hyperdrive(client.corestore, key); 

    console.log(await drive.promises.readdir('/'));
} catch (error) {
    console.log("Ocorreu um erro");
    console.log(error);    
}


}

main('cb3acb192ff27a0e0ce10ea52ee3680c6388a9e3c209685ba22d679d716a6842');