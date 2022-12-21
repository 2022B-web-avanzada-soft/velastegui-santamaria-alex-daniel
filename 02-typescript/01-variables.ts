let nombre:string = 'Daniel' // primitiva
let nombre2:String = 'Daniel' // clase String

// nombre = 1

let edad:number = 32;
let casado:boolean = false;
let fecha:Date = new Date();

let numero = 2
let letra = 'a'
let variable: number | string | Date = 5
variable = '2'
console.log((variable as unknown as number))