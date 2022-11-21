// Destructuración de OBJETOS

const adrian = {
    nombre: 'Adrian',
}

const carolina = {
    nombre: "Carolina",
    apellido: "Velastegui"
}

const adrianCarolina = {
    ...adrian,
    ...carolina,
}

console.log(adrianCarolina)

// Destructuración de arreglos
const arregloUno = [1, 2, 3, 4, 5]
const arregloDos = [6, 7, 8, 9, 10]
const superArreglos = [
    ...arregloUno,
    ...arregloDos,
]
console.log('superArreglo', superArreglos)