import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect} from "react";
import {MONEDAS} from "../hooks/Monedas";

export default function () {
    const [moneda, UseSelectMoneda] = useSelectMoneda(
        'Moneda: ',
        MONEDAS
    );

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