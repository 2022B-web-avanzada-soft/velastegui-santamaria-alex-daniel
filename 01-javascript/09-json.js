const arregloUsuarios = {
    receta: {
        id:1,
        nombre:'Daniel',
    }
}

const arregloGUardado = JSON.stringify(arregloUsuarios)
console.log(arregloGUardado)

const arregloRestaurado = JSON.parse(arregloGUardado)
console.log(arregloRestaurado)