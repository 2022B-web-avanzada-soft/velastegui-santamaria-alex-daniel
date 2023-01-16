import {useContext} from "react";
import {ContenedorContext} from "./ContenedorContext";
import EComponenteC from "./EComponenteC";

export default function (){
    const contenedorContext = useContext(ContenedorContext);
    return (
        <>
            Componente B
            <p>
                {contenedorContext.nombreUsuario}
            </p>
            <button onClick={(e) => {
                e.preventDefault();
                contenedorContext.setNombreUsuario("CompB");
            }}>
                Cambiar nombre
            </button>
            <EComponenteC/>
        </>
    )
}