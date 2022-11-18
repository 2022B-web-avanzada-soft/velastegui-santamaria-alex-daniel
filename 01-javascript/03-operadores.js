const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    }
];

const respuestaFind = arreglo.find(
    function(valorActual, indiceActual, arregloCompleto){
        // console.log("Valor Actual", valorActual)
        // console.log("Indice Actual", indiceActual)
        // console.log("arregloCompleto", arregloCompleto)
        return valorActual.nota < 5
    }
)

// console.log("respuestaFind", respuestaFind)

const respuestaFindIndex = arreglo.findIndex(
    function(valorActual, indicieActual, arregloCompleto){
        return valorActual.nombre === "Cristian"
    }
)

// console.log("respuestaFindIndex", respuestaFindIndex)

const respuestaForEach = arreglo.forEach(
    function(valorActual, indiceActual, arregloCompleto){
        console.log("valorActual", valorActual)
    }
)

// console.log("respuestaForEach", respuestaForEach)

const respuestaMap = arreglo.map(
    (valorActual, indiceActual, arregloCompleto) => {
        const notaActual = valorActual.nota + 1
        const nuevoElemento = {
            id: valorActual.id,
            nota: notaActual,
            estaAprobado: notaActual >= 14,
            casado: false,
        }
        return nuevoElemento
    }
)

// console.log(arreglo)
// console.log(respuestaMap)

const respuestaFilter = arreglo.filter(
    (valorActual, indiceActual, arregloCompleto) => {
        return valorActual.nota >= 14
    }
)

// console.log("arreglo", arreglo)
// console.log("respuestaFilter", respuestaFilter)

const respuestaSome = arreglo.some(
    (valorActual, indiceActual, arregloCompleto) => {
        return valorActual.nota < 9
    }
)

// console.log("respuestaSome", respuestaSome)

const respuestaAny = arreglo.every(
    (valorActual, indiceActual, arregloCompleto) => {
        return valorActual.nota < 9
    }
)

// console.log("respuestaAny", respuestaAny)

const respuestReduce = arreglo.reduce(
    (valorAcumulado, valorActual, indice) => {
        return (valorAcumulado + valorActual.nota)
    },
    0
)

// console.log("respuestaReduce", respuestReduce)

const respuestaReduceRight = arreglo.reduceRight(
    (valorAcumulado, valorActual, indice) => {
        return (valorAcumulado + valorActual.nota)
    },
    0
)

console.log("respuestaReduceRight", respuestaReduceRight)