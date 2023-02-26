import {useEffect, useState} from "react";
import io from "socket.io-client";
import Head from "next/head";

const servidor = "http://localhost:8086";
const socket = io(servidor);

export interface Moneda {
    id: number;
    nombre: string;
    valor: number;
}

const arrayMonedas: Moneda[] = [
    {
        id: 1,
        nombre: 'Bitcoin',
        valor: 0
    },
    {
        id: 2,
        nombre: 'Ethereum',
        valor: 0
    },
    {
        id: 3,
        nombre: 'Ripple',
        valor: 0
    }
];

export default function () {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [monedas, setMonedas] = useState(arrayMonedas);

    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('Desconectado');
            });
            socket.on('escucharEventoCambiarValorMoneda', (data: {moneda: Moneda, nuevoValor: number}) => {
                console.log('escucharEventoCambiarValorMoneda: ', data);
                const moneda = monedas.find((moneda) => moneda.id === data.moneda.id);
                if (moneda) {
                    moneda.valor = data.nuevoValor;
                    setMonedas([...monedas]);
                }
            });
        }
    );

    const cambiarValorMoneda = (moneda: Moneda, variacion: number) => {
        const nuevoValor = moneda.valor + variacion;
        socket.emit(
            'cambiarValorMoneda',
            {moneda, nuevoValor},
            (data: Moneda) => {
                console.log('cambiarValorMoneda: ', data);
                moneda.valor = nuevoValor;
                setMonedas([...monedas])
            }
        )
    }

    return (
        <>
            <Head>
                <title>{"Cryptomonedas"}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                      crossOrigin="anonymous"></link>
            </Head>
            <h1 className={"h1"}>
                Cryptomonedas a tiempo real
            </h1>
            <h3 className={"h5"}>
                Estado de la conexión: {isConnected ? 'Conectado' : 'Desconectado'}
            </h3>
            <div className="d-flex justify-content-center align-items-center vh-100 container w-80 my-5">
                <table className="table table-bordered text-center">
                    <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {monedas.map((moneda) => (
                        <tr key={moneda.id}>
                            <td className={"text-light"}>{moneda.nombre}</td>
                            <td className={"text-light"}>$ {moneda.valor}</td>
                            <td>
                                <button className="btn btn-secondary btn-lg me-2" onClick={() => cambiarValorMoneda(moneda, -1)}>
                                    -
                                </button>
                                <button className="btn btn-primary btn-lg" onClick={() => cambiarValorMoneda(moneda, 1)}>
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}