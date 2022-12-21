function sumarNumeros(
    numeroInicial: number,
    ...numerosInfinitos: number[]
): number {
    return numeroInicial
}

function imprimir(mensaje?: string): void{
    console.log('Hola ' + mensaje ? mensaje: 'bienvenido')
}

const arregloNumeros: number[] = [1, 2]
const arregloNumeroDos: Array<number> = [1, 2]
const arregloNumerosTres: (number|string)[] = [1, '2']
const arregloNumeroCuatro: Array<number|string> = [1, '2']
// Aqui solo puede existir un tipo de dato a la vez
let arregloNumeroCinco: number[] | string[] = [1, 2]
arregloNumeroCinco = ['1', '2']