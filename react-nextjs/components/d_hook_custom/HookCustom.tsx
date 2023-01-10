import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect} from "react";

export default function () {
    const [moneda, UseSelectMoneda] = useSelectMoneda(
        'Moneda: ',
        [
            {id: 'USD', nombre: 'Dolar de Estados Unidos'},
            {id: 'MXN', nombre: 'Peso Mexicano'},
            {id: 'EUR', nombre: 'Euro'},
            {id: 'GBP', nombre: 'Libra Esterlina'},
        ]);

    useEffect(() => {
            console.log(moneda);
        },
        [moneda],
    )

    return (
        <>
            {UseSelectMoneda}
        </>
    )
}