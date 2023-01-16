import {useContext, useEffect} from "react";
import {ContenedorContext} from "./ContenedorContext";
import EComponenteB from "./EComponenteB";

export default function (){
    const contenedorContext = useContext(ContenedorContext);
    useEffect(
        () => {
            console.log("Cambio en algun lado el nombre de usuario: ", contenedorContext.nombreUsuario);
        },
        [contenedorContext.nombreUsuario]
    )
    return (
        <>
            Componente A
            <p>
                {contenedorContext.nombreUsuario}
            </p>
            <button className="bg-blue-500 m-5" onClick={(e) => {
                e.preventDefault();
                contenedorContext.setNombreUsuario("CompA");
            }}>
                Cambiar nombre
            </button>
            <EComponenteB/>
        </>
    )
}