const fs = require("fs")


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
                    resolve(nuevaData)
                }
            )
        }
    )
}

module.exports = {
    leerArchivo,
    escribirArchivo
}