
// When type = module: or ES6
import { v4 as uuidv4 } from 'uuid';
// Other cases: or ES5 
// const { v4: uuidv4 } = require('uuid');

console.log(uuidv4()); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

console.log(`${(new Date()).getHours()} : ${(new Date()).getMinutes()} : ${(new Date()).getSeconds()}`);

setTimeout(() => {

    console.log('Ernestas');
    console.log(`${(new Date()).getHours()} : ${(new Date()).getMinutes()} : ${(new Date()).getSeconds()}`);
}, 2000)

console.log(`${(new Date()).getHours()} : ${(new Date()).getMinutes()} : ${(new Date()).getSeconds()}`);