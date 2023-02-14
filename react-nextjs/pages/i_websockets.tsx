import io from "socket.io-client";
import {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
const servidor = "http://localhost:8085";
const socket = io(servidor);
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
            });
            socket.on('escucharEventoMensajeSala', (data: {mensaje: string}) => {
                console.log('escucharEventoMensajeSala');
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

    return (
        <>
            <Layout title={'WebSockets'}>
                <h1>Webscokets</h1>
                <button className={'btn btn-success'} onClick={() => enviarEventoHola()}>Enviar evento hola</button>
                <div className={'row'}>
                    <div className={'col-sm-6'}>
                        FORMULARIO
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