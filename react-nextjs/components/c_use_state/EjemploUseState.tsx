import {useState} from "react";

interface Usuario{
    nombre: string;
    edad: number;
    casado: boolean;
    hijos?: number[];
}

export default function () {
    const [numero, setNumero] = useState(0);
    const [texto, setTexto] = useState("Texto inicial");
    const [arregloNumeros, setArregloNumeros] = useState([1, 2, 3])
    const [usuario, setUsuario] = useState({
        nombre: "Juan",
        edad: 20,
        casado: false,
    } as Usuario);

    return(
        <>
            <button className="bg-blue-50" onClick={(event)=>{
                event.preventDefault()
                setNumero(numero+1)
            }}>Número</button>
            <button className="bg-amber-50" onClick={(event)=>{
                event.preventDefault()
                setArregloNumeros([...arregloNumeros, 4])
            }}>Arreglo</button>
            <button className="bg-blend-color-burn" onClick={(event)=>{
                event.preventDefault()
                let usuarioNuevo = {...usuario, nombre: new Date().toISOString()}
                setUsuario(usuarioNuevo)
            }}>Usuario</button>
        </>
    )
}