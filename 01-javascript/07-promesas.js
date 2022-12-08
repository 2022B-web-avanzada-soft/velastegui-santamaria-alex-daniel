const fs = require("fs")

function promesaEsPar(numero){
    const miPrimerPromesa = new Promise(
        (resolve, reject) => {
            if(numero % 2 === 0){
                resolve(numero)
            }
            reject("No es par")
        }
    )
    return miPrimerPromesa
}

function promesaElevarAlCuadrado(numero){
    return new Promise(res => res(Math.pow(numero, 2)))
}

promesaEsPar(2)
    .then(
        (data) =>{
            console.log("DATA 1", data)
            return promesaElevarAlCuadrado(data)
        }
    )
    .then(
        (data) => {
            console.log("DATA 2", data)
            return promesaElevarAlCuadrado(data)
        }
    )
    .then(
        (data) => {
            console.log("DATA 3", data)
            return promesaEsPar(data+1)
        }
    )
    .then(
        (data) => {
            console.log("DATA 4", data)
            return promesaEsPar(data)
        }
    )
    .catch(
        (error) => {
            console.error("ERROR", error)
        }
    )
    .finally(
        ()=>{
            console.log("FINALLY")
        }
    )
