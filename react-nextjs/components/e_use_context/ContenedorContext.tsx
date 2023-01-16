import {createContext, Dispatch, SetStateAction} from "react";

export const ContenedorContext = createContext({} as ContenedorContextObject);

export interface ContenedorContextObject {
    nombreUsuario: string;
    setNombreUsuario: Dispatch<SetStateAction<string>>
}