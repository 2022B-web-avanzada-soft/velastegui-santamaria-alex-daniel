export class A{

}

export interface B{

}

interface Usuario{
    nombre: string;
    apellido: string;
    edad?: number;
    sueldo?: number;
    casado: boolean | 0 | 1;
    imprimirUsuario: (mensaje: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual?: () => 'AP' | 'AF' | 'AT';
}

let userDaniel: Usuario = {
    nombre: 'Daniel',
    apellido: 'Velastegui',
    edad:22,
    casado: false,
    imprimirUsuario: (mensaje: string) => {
        return 'El mensjae es: ' + mensaje
    },
    calcularImpuesto: impuesto => {
        return userDaniel.sueldo
    },
}