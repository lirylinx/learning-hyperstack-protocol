import Corestore from 'corestore';

const store = new Corestore('./store');

//Pde se acessar núcleos da loja por sua chave pública ou um nome local
const core = store.get({name: 'primeiro-core'});

await core.ready();
const sameCore = store.get(Buffer.from(core.key));

await sameCore.ready
console.log('Core chave publica: ', core.key.toString('hex'));
console.log('Core tem: %s entries', core.length);

await core.append(Buffer.from('Bloco #' +  core.length ));

console.log('Dados SameCore: ', (await sameCore.get(sameCore.length - 1)).toString());