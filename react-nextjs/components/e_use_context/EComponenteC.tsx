import {useContext} from "react";
import {ContenedorContext} from "./ContenedorContext";

export default function (){
    const contenedorContext = useContext(ContenedorContext);
    return (
        <>
            Componente C
            <p>
                {contenedorContext.nombreUsuario}
            </p>
            <button onClick={(e) => {
                e.preventDefault();
                contenedorContext.setNombreUsuario("CompC");
            }}>
                Cambiar nombre
            </button>
        </>
    )
}