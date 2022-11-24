const fs = require('fs')

let contenidoUno = ""
let contenidoDos = ""

leerPrimerArchivo()

function leerPrimerArchivo(){
    fs.readFile(
        './06-ejemplo.txt',
        'utf-8',
        (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
            if (errorLecturaPrimerArchivo){
                console.log("ERROR LEYENDO ARCHIVO", errorLecturaPrimerArchivo)
            }else{
                contenidoUno = contenidoPrimerArchivo
                leerSegundoArchivo()
            }
        }
    )
}

function leerSegundoArchivo(){
    fs.readFile(
        './01-variables.js',
        'utf-8',
        (errorLectura, contenido) => {
            if (errorLectura){
                console.log("ERROR LEYENDO ARCHIVO", errorLectura)
            }else{
                contenidoDos = contenido
                crearArchivo()
            }
        }
    )
}

function crearArchivo(){
    fs.writeFile(
        "./06-nuevo.archivo.txt",
        contenidoUno + contenidoDos,
        (error) => {
            console.log(error)
        }
    )
}

