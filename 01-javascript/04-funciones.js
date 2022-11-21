function soloNumeros(a, b, c){
    return a - b +c;
}

console.log(soloNumeros(1, 2,3))
console.log(soloNumeros('1', '3', '4'))

function soloLetras(a, b, c){ // Sin return se devuelve undefined
    console.log(a, b, c)
}

function funcionNombrada(){
    console.log("Soy una funcion nombrada")
}

const funcionSinNombre = function(){
    console.log("Soy una funcion sin nombre")
}
funcionSinNombre()

let funcionFatArrow = () => {
    console.log("Soy una funcion Fat Arrow")
}

funcionFatArrow()

var funcionFatArrowDos = (parametro) => {
    return parametro + 1
}

var functionFatArrowOneLine = (parametro) => parametro + 1 // Es igual a la de arriba pero omitimos llaves y return

var functionFatArrowSimple = parametro => parametro + 1 // Podemos omitir parentesis SI Y SOLO SI hay un solo parametro

function sumarNumeros(...numeros){
    return numeros.reduce((acumulado, valor) => acumulado + valor, 0)
}

console.log(sumarNumeros(1, 2, 3, 4,5 , 6, 7, 8, 9))