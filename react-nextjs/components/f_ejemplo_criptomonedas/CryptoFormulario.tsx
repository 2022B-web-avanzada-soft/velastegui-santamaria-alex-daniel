import {MONEDAS} from "../hooks/Monedas";
import {useEffect, useState} from "react";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {MonedaInterface} from "../../interfaces/moneda";

class CriptoMonedaInterface {
}

export default function ({setMonedas}) {
    const [monedasArreglo, setMonedasArreglo] = useState(MONEDAS)
    const [criptoMonedasArreglo, setCriptoMonedasArreglo] = useState([] as MonedaInterface[])
    const [valorMoneda, SelectMonedaComponente] = useSelectMoneda(
        'Moneda: ',
        monedasArreglo,
    );
    const [valorCriptoMoneda, SelectCriptoMonedaComponente] = useSelectMoneda(
        'Criptomoneda: ',
        criptoMonedasArreglo,
    );
    useEffect(
        () => {
            const consultarAPI = async () => {
                const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCriptoMonedasArreglo(resultado.Data.map(
                    (criptoMoneda) => {
                        const criptoMonedaLocal: MonedaInterface = {
                            id: criptoMoneda.CoinInfo.Name,
                            nombre: criptoMoneda.CoinInfo.FullName,
                        }
                        return criptoMonedaLocal;
                    }
                ));
            }
            consultarAPI();
        },
        []
    )
    const manejarSubmitFormulario = (e) => {
        e.preventDefault();
        setMonedas({
            moneda: valorMoneda,
            criptoMoneda: valorCriptoMoneda,
        })
    }
    return (
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {SelectMonedaComponente}
                {SelectCriptoMonedaComponente}
                <br></br>
                <button className='btn btn-primary w-100' type='submit'>Calcular</button>
            </form>
        </>
    )
}