import {useState} from "react";

type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar: boolean;
}

export default function (props: PropiedadesComponente){
    const {url, iteraciones, mostrar} = props
    const [iteracion, setIteracion] = useState(iteraciones)
    const contenidoCondicional = () => {
        if(mostrar){
            return <p>Hola</p>
        }
        return <></>
    }

    return (
        <>
            <a href={url}>IR A GOOGLE</a>
            {/*{mostrar ? <p>HELLOS</p> : <></>}*/}
            {/*{contenidoCondicional()}*/}
            {mostrar && <p>HELLOS</p>}
            <div>
                {iteracion}
            </div>
            <button className="bg-blue-500" onClick={
                (event) => {
                    setIteracion(iteracion + 1)
                }
            }>AUMENTAR</button>
        </>
    )
}