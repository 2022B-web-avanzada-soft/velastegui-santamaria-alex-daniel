import io from "socket.io-client";
import {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
const servidor = "http://localhost:8085";
const socket = io(servidor);

export interface FormularioModelo {
    salaId: string;
    nombre: string;
    mensaje: string;
}
export type MensajeSala = FormularioModelo;

export default function () {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);

    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: ''
        },
        mode: 'all',
    });

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
            socket.on('escucharEventoHola', (data: {mensaje: string}) => {
                console.log('escucharEventoHola');
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Servidor',
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });
            socket.on('escucharEventoUnirseSala', (data: {mensaje: string}) => {
                console.log('escucharEventoUnirseSala');
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Servidor',
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });
            socket.on('escucharEventoMensajeSala', (data: MensajeSala) => {
                console.log('escucharEventoMensajeSala');
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: `${data.salaId} - ${data.mensaje}`,
                    nombre: data.nombre,
                    posicion: 'I'
                }
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });
        },
        []
    );

    const enviarEventoHola = () => {
        const nuevoMensaje: MensajeChatProps = {
            nombre: 'Servidor',
            mensaje: 'Daniel',
            posicion: 'I'
        };
        socket.emit(
            'hola',
            nuevoMensaje,
            (datosEventHola) => {
                console.log(datosEventHola);
                setMensajes((mensajes) => [...mensajes, nuevoMensaje]);
            }
        )
    }

    const unirseSalaOEnviarMensajeSala = (data: FormularioModelo) => {
        if (data.mensaje === ''){
            // Nos uniomos a la sala
            const dataEventoUnirseSala = {
                salaId: data.salaId,
                nombre: data.nombre
            };
            socket.emit(
                'unirseSala', // Evento
                dataEventoUnirseSala, // Parámetros del evento
                () => { // Callback o lo que se ejecuta cuando el servidor responde
                    const nuevoMensaje: MensajeChatProps = {
                        nombre: 'Servidor',
                        mensaje: 'Bienvenido a la sala ' + data.salaId,
                        posicion: 'I'
                    };
                    setMensajes((mensajes) => [...mensajes, nuevoMensaje]);
                });
        }else{
            // Enviamos mensaje
            const dataEventoMensajeSala = {
                salaId: data.salaId,
                nombre: data.nombre,
                mensaje: data.mensaje
            }
            socket.emit(
                'enviarMensaje',
                dataEventoMensajeSala,
                () => {
                    const nuevoMensaje: MensajeChatProps = {
                        nombre: data.nombre,
                        mensaje: data.mensaje,
                        posicion: 'D'
                    };
                    setMensajes((mensajes) => [...mensajes, nuevoMensaje]);
                });
        }
    }

    return (
        <>
            <Layout title={'WebSockets'}>
                <h1>Webscokets</h1>
                <button className={'btn btn-success'} onClick={() => enviarEventoHola()}>Enviar evento hola</button>
                <div className={'row'}>
                    <div className={'col-sm-6'}>
                        <h1>FORMULARIO</h1>
                        <div className={'row'}>
                            <div className={'col-sm-6'}>
                                <form onSubmit={handleSubmit(unirseSalaOEnviarMensajeSala)}>
                                    <div className={'mb-3'}>
                                        <label htmlFor="salaId" className={'form-label'}>Sala ID</label>
                                        <input type="text"
                                               className={'form-control'}
                                               placeholder={'EJ: 1234'}
                                               id={'salaId'}
                                               {...register('salaId', {required: 'Ingresa una salaId'})}
                                               aria-describedby={'salaIdHelp'}/>
                                        <div id={'salaIdHelp'} className={'form-text'}>Ingresa una salaId</div>
                                    </div>
                                    <div className={'mb-3'}>
                                        <label htmlFor="nombre" className={'form-label'}>Nombre</label>
                                        <input type="text"
                                               className={'form-control'}
                                               placeholder={'EJ: Daniel'}
                                               id={'nombre'}
                                               {...register('nombre', {required: 'Ingresa tu nombre'})}
                                               aria-describedby={'nombreHelp'}/>
                                        <div id={'salaIdHelp'} className={'form-text'}>Ingresa tu nombre</div>
                                    </div>
                                    <div className={'mb-3'}>
                                        <label htmlFor="mensaje" className={'form-label'}>Mensaje</label>
                                        <input type="text"
                                               className={'form-control'}
                                               placeholder={'EJ: Hola Mundo'}
                                               id={'mensaje'}
                                               {...register('mensaje')}
                                               aria-describedby={'mensajeHelp'}/>
                                        <div id={'salaIdHelp'} className={'form-text'}>Ingresa un mensaje, es opcional</div>
                                    </div>

                                    <button type={'submit'}
                                            className={'btn btn-primary'}
                                            disabled={!isValid}>
                                        Unirse Sala
                                    </button>
                                    <button type={'reset'}
                                            className={'btn btn-danger'}>
                                        Limpiar
                                    </button>

                                    {errors.salaId &&
                                        <div className={'alert alert-danger'} role={'alert'}>
                                            Existen errores en el formulario: {errors.salaId.message}
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={'col-sm-6'}>
                        {mensajes.map((mensaje, indice) =>
                            <MensajeChat key={indice} {...mensaje}/>)
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}