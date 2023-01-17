// FOrmas de declarar un componente

// const a_componente = function (){
//     return (
//         <>
//
//         </>
//     )
// }
//
// const b_componente = () => {
//     return <></>
// }
//
// export default a_componente


// La que le agrada al profe

import EstilosEjemplo from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/b_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo(){
    return (
        <>
            <Layout title="EPN | Hola Mundo"></Layout>
            <h1>Hola Mundo</h1>
            <EstilosEjemplo></EstilosEjemplo>
            <Componente
                iteraciones={3}
                mostrar={true}
                url={'google.com'}></Componente>
            <Componente
                iteraciones={56}
                mostrar={false}
                url={'google.com'}></Componente>
        </>

    )
}