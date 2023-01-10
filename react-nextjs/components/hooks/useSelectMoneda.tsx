import {MonedaInterface} from "../../interfaces/moneda";
import {useState} from "react";

export default function (label: string,opciones: MonedaInterface[],){
    // return: select del arrglo de monedas (html - jsx)
    // valor de esa moneda
    const [moneda, setMoneda] = useState('');
    const generarJSXElementMonedas: () => JSX.Element[] = () => {
        return opciones.map(
            (moneda)=>(
                <option key={moneda.id} id={moneda.id} value={moneda.id}>
                    {moneda.nombre}
                </option>
            )
        );
    }
    const UseSelectMonedas = (
        <>
            <label className='form-label' htmlFor={label}>{label}</label>
            <select className='form-select'
                    name={label}
                    id={label}
                    value={moneda}
                    onChange={e => {
                        e.preventDefault()
                        setMoneda(e.target.value);
                    }}>
                <option value=''>Seleccione una moneda</option>
                {generarJSXElementMonedas()}
            </select>
        </>
    )

    return [moneda, UseSelectMonedas];
}