type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar: boolean;
}

export default function (props: PropiedadesComponente){
    const {url, iteraciones, mostrar} = props

    return (
        <>
            <a href={url}>IR A GOOGLE</a>
            {mostrar ? <p>HELLOS</p> : <></>}
            <div>
                {iteraciones}
            </div>
        </>
    )
}