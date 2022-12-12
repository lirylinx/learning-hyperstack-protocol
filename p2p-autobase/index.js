import Hypercore from 'hypercore';
import Autobase from 'autobase';
import ram from 'random-access-memory';
import Corestore from 'corestore';

// Criar dois usuários de chat, cada um com seus próprios Hypercores.
 // Aqui já que rodaremos muito o mesmo código, usaremos o armazenamento ram

 const store =  new Corestore(ram);
 const userA = store.get({name: 'userA'});
 const userB = store.get({name: 'userB'});

// Criar um Autobase com esses dois usuários como entradas.

const baseA = new Autobase({inputs: [userA, userB], localInput: userA});
const baseB = new Autobase({inputs: [userB, userA], localInput: userB});

// Ordenando as mensagens

await baseA.append('A0: hello!');
await baseB.append('B0: hi! good to hear from you');
await baseA.append('A1: likewise. fun exercise huh?');
await baseB.append('B1: yep. great time.');


// Imprimir todas as mensagens em ordem causal
// for await ( const node of baseA.createCausalStream()) {
//     console.log(node.value.toString());
//     console.log(node.clock);

// }

// console.log('__________________________________________--')
// for await ( const node of baseB.createCausalStream()) {
//     console.log(node.value.toString());
//     console.log(node.clock);

// }


// Array vazio no segundo argumento significa 'relogio vazio'

await baseA.append('A0: hello! anybody home?', []) 
await baseB.append('B0: hello! first one here.', [])
await baseA.append('A1: hmmm. guess not.', [])
await baseB.append('B1: anybody home?', [])

await baseA.append('A2: mensagem 1', []) 
await baseA.append('A3: mensagem 2', []) 
await baseA.append('A4: mensagem 3', []) 

await baseB.append('B2: mensagem b2', []) 
await baseB.append('B3: mensagem b3', []) 
await baseB.append('B4: mensagem b4', []) 
await baseB.append('B5: mensagem b5', []) 
await baseB.append('B6: mensagem b6', []) 
await baseB.append('B7: looks like we\'re both online!')
await baseA.append('A5: mensagem A5', []) 
await baseB.append('B8: mensagem b8', []) 




for await (const node of baseA.createCausalStream()) {
    console.log(node.value.toString());
}

// console.log("________________ Node B __________________");

// for await (const node of baseB.createCausalStream()) {
//     console.log(node.value.toString());
// }



const viewCore = store.get({name: 'view-core'});
const view = baseA.linearize(viewCore)
console.log(view.status);

await view.update();



// O bloco no indice 0 é o cabeçalho do bloco, então pula-se

for (let i = 0; i < view.length; i++) {
    const node = await view.get(i);
    console.log(node.value.toString());
}