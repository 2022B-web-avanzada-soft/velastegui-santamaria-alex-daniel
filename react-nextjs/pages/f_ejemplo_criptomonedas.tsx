import Layout from "../components/Layout";
import CryptoFormulario from "../components/f_ejemplo_criptomonedas/CryptoFormulario";
import {useEffect, useState} from "react";

export interface ConsultaMonedaInterface {
    moneda: string,
    criptoMoneda: string,
}

export default function () {
    const [monedas, setMonedas] = useState({} as ConsultaMonedaInterface);
    const [resultado, setResultado] = useState({} as any);

    useEffect(() => {
            if (Object.keys(monedas).length === 2){
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.criptoMoneda}&tsyms=${monedas.moneda}`;
                const consultarAPI = async () => {
                    const respuesta = await fetch(url);
                    const resultado = await respuesta.json();
                    setResultado(resultado.DISPLAY[monedas.criptoMoneda][monedas.moneda]);
                }
                consultarAPI();
            }
        },
    [monedas]);

    return (
        <>
            <Layout title="EPN | Ejemplo Criptomoneda">
                <div className="text-center">
                    <h1>Crypto Exchange Calculator</h1>
                    <img src="https://media.ambito.com/p/e2e0836c4f57f5ae2890d784df8de512/adjuntos/239/imagenes/038/723/0038723804/criptomonedasjpg.jpg%22" className={'rounded'} alt=""/>
                </div>
                <h2>Selección</h2>
                <p>Seleccione la moneda y la criptomoneda</p>
                <div className="row">
                    <div className="col-sm-6">
                        <CryptoFormulario setMonedas={setMonedas}/>
                    </div>
                    <div className="col-sm-6">
                        {
                            resultado.PRICE &&

                            <div>
                                <p><strong>PRECIO: </strong> {resultado.PRICE}</p>
                                <p><strong>Precio más alto del día: </strong> {resultado.HIGHDAY}</p>
                                <p><strong>Precio más bajo del día: </strong> {resultado.LOWDAY}</p>
                                <p><strong>Variación últimas 24h: </strong> {resultado.CHANGEPCT24HOUR}</p>
                                <p><strong>Última actualización: </strong> {resultado.LASTUPDATE}</p>
                            </div>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}