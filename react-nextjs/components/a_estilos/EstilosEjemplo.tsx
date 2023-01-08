import styles from './estilos.module.css'
import styled from "@emotion/styled";

// Styled Components
const Titulo = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  color: orange;
`
const TituloRojo = styled.h1`
  font-size: 2rem;
  text-transform: capitalize;
  color: red;
`
const Subtitulo = styled.h1`
  font-size: 1.5rem;
  text-transform: capitalize;
  color: green;
`

export default function (){
    const misEstilos = {
        color: 'white',
        backgroundColor: 'black',
        borderBottom: '5px solid yellow',
    }
    return (
        <>
            <Titulo>Titulo</Titulo>
            <TituloRojo>Titulo Rojo</TituloRojo>
            <Subtitulo>Subtitulos</Subtitulo>




            <h1 style={
                {
                    color: misEstilos.color,
                    borderBottom: misEstilos.borderBottom,
                    backgroundColor: 'pink',
                }
            }>
                Estilos en objeto
            </h1>


            <div style={misEstilos}>OTROS ESTILOS</div>

            <div className={styles.rojo}>
                Hola
            </div>
        </>
    )
}