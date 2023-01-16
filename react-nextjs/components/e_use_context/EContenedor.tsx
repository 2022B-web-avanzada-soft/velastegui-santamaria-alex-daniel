import {ContenedorContext, ContenedorContextObject} from "./ContenedorContext";
import {useState} from "react";
import EComponenteA from "./EComponenteA";

export default function (){
    const [nombreUsuario, setNombreUsuario] = useState("Daniel");
    const contenedorContext: ContenedorContextObject = {nombreUsuario, setNombreUsuario};
    return(
        <>
            <ContenedorContext.Provider value={contenedorContext}>
                <EComponenteA/>
            </ContenedorContext.Provider>
        </>
    )
}