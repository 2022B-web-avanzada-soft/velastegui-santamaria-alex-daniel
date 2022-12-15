const fs = require("fs")

/*
* Una funcion que acepte como parametro una variable
* del path del archivo y otra variable con el contenidoArchivo
* Utilizar el modulo fs para leer el archivo en ese path y agregar
* el contenidoArchivo a ese path
* */

function leerArchivo(path){
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path,
                "utf-8",
                (error, contenido) => {
                    if(error){
                        reject("ERROR LEYENDO ARCHIVO")
                    }
                    resolve(contenido)
                }
            )
        }
    )
}

function escribirArchivo(path, nuevaData){
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
                nuevaData,
                (error) => {
                    if(error){
                        reject("ERROR ESCRBIENDO ARCHIVO")
                    }
                    resolve("SE HA ESCRITO EL ARCHIVO CORRECTAMENTE")
                }
            )
        }
    )
}

path = "./06-ejemplo.txt"
// Manejo de promesas con then y catch
/*leerArchivo(path)
    .then(
        (data) => {
            return escribirArchivo(path, data + "\nLO LOGRAMOS!!!")
        }
    )
    .then(
        (data) => {
            console.log(data)
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )
*/

// Manejo de promesas con ASYNC AWAIT

async function asyncAwaitUno(path){
    try{
        const respuestaContenidoArchivo = await leerArchivo(path)
        await escribirArchivo(path, respuestaContenidoArchivo + "\nAWAIT!!!")
    }catch (error){
        console.log(error)
    }
}

const asyncAwaitDos = async function (){

}

const asyncAwaitTres = async () => {

}

asyncAwaitUno(path)

