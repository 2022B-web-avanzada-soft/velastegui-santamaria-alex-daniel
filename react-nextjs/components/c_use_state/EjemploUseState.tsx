import {useEffect, useState} from "react";

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

    useEffect(
        () => {
            console.log("INICIO EL COMPONENTE", numero, usuario);
        },
        []
    )

    useEffect(
        () => {
            console.log("Cambio número: ", numero);
        },
        [numero]
    )
    useEffect(
        () => {
            console.log("Cambio arregloNumeros: ", arregloNumeros);
        },
        [arregloNumeros]
    )
    useEffect(
        () => {
            console.log("Cambio usuario: ", usuario);
        },
        [usuario]
    )
    useEffect(
        () => {
            console.log("Cambio todo: ", numero, arregloNumeros, usuario);
        },
        [numero, arregloNumeros, usuario]
    )


    return(
        <>
            <button className="bg-blue-500 m-5" onClick={(event)=>{
                event.preventDefault()
                setNumero(numero+1)
            }}>Número</button>
            <br/>
            <button className="bg-amber-500 m-5" onClick={(event)=>{
                event.preventDefault()
                setArregloNumeros([...arregloNumeros, 4])
            }}>Arreglo</button>
            <br/>
            <button className="bg-red-700 m-5" onClick={(event)=>{
                event.preventDefault()
                let usuarioNuevo = {...usuario, nombre: new Date().toISOString()}
                setUsuario(usuarioNuevo)
            }}>Usuario</button>
        </>
    )
}