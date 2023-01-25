import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import Layout from "../components/Layout";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

type Formulario = {
    nombre: string;
    estadoCivil: string;
}

export default function (){
    const [nombre, setNombre] = useState('Daniel')

    const { handleSubmit, register,
        formState: {errors, isValid}, control } = useForm<Formulario>(
        {
            defaultValues: {
                nombre: 'Alex',
                estadoCivil: ''
            },
            mode: 'all'
        }
    )

    const controladorSubmit = (data: Formulario) => {
        console.log(data)
    }

    return (
        <>
            <Layout title={"React Hook Form"}>
                <h1>React Hook Form</h1>
                <form onSubmit={handleSubmit(controladorSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Ej. Daniel"
                               id="nombre"
                               {...register('nombre', {
                                   required: {
                                       value: true,
                                       message: 'El nombre es obligatorio'
                                   },
                                   minLength: {
                                       value: 3,
                                       message: 'El nombre debe tener al menos 3 caracteres'
                                   },
                                   maxLength: {
                                       value: 10,
                                       message: 'El nombre debe tener máximo 10 caracteres'
                                   },
                                   validate: {
                                       soloNumeros: (value) => {
                                           if (Number.isNaN(+value)) {
                                               return 'Debe ser numérico'
                                           }
                                           return true
                                       }
                                   }
                               })}
                               aria-describedby={'nombreAyuda'}/>
                        <div id="nombreAyuda" className="form-text">Escribe tu nombre</div>
                        {
                            errors.nombre &&
                            <div
                                className="alert alert-danger"
                                role="alert">
                                {errors.nombre.message}
                            </div>
                        }
                    </div>
                    <div className="mb-3">
                        <FormControl fullWidth>
                            <InputLabel id={'estadoCivil'}>Estado Civil</InputLabel>
                            <Controller
                                control={control}
                                name={'estadoCivil'}
                                rules={
                                    {
                                        required: {
                                            value: true,
                                            message: 'El estado civil es obligatorio'
                                        }
                                    }
                                }
                                render={
                                    ({field:{onChange, value, onBlur}}) => (
                                        <Select
                                            labelId={'estadoCivil'}
                                            id={'estadoCivil'}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        >
                                            <MenuItem value={'soltero'}>Soltero</MenuItem>
                                            <MenuItem value={'casado'}>Casado</MenuItem>
                                            <MenuItem value={'divorciado'}>Divorciado</MenuItem>
                                            <MenuItem value={'viudo'}>Viudo</MenuItem>
                                        </Select>
                                    )
                                }
                            />
                            {errors.estadoCivil &&
                                <div className="alert alert-danger" role="alert">
                                    {errors.estadoCivil.message}
                                </div>
                            }
                        </FormControl>
                    </div>
                    <Button type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={!isValid}>
                        Enviar
                    </Button>
                </form>
            </Layout>
        </>
    )
}