class Persona {
    public nombre: string;
    public apellido: string;
    static nombreReferencial: string = 'Humano';
    protected nombreYApeelido = ''
    constructor(nombre: string, apellido: string) {
        this.nombre = nombre
        this.apellido = apellido
        this.nombreYApeelido = nombre + ' ' + apellido
    }

    private mostrarNombreYApellido(): string{
        return this.nombreYApeelido
    }
}

class Usuario extends Persona{
    constructor(
        nombre: string, apellido: string,
        public cedula: string,
        public estadoCivil: string
    ) {
        super(nombre, apellido)
        this.cedula
        this.estadoCivil
    }
}

const daniel = new Usuario(
    'Daniel',
    'Velastegui',
    '1805461991',
    'soltero'
)
