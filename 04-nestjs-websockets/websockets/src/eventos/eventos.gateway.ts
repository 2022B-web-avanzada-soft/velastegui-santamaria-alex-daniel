import {
    ConnectedSocket,
    MessageBody,
    WebSocketGateway,
    SubscribeMessage
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway(
    8080, // Puerto donde escucha el servidor de websockets
    {
        cors: {
            origin: "*", // Habilitando la conexion desde cualquier IP
        }
    }
)
export class EventosGateway{
    @SubscribeMessage("hola")
    devolverHola(
        @MessageBody()
        message: {mensaje: string},
        @ConnectedSocket()
        socket: Socket
    ){
        console.log(message);
        socket.broadcast
            .emit(
                'escucherEventoHola',
                {
                    mensaje: 'Hola desde el servidor ' + message.mensaje
                }
            )
        return {mensaje: 'ok'}
    }

    @SubscribeMessage("unirseSala")
    unirseSala(
        @MessageBody()
        message: {salaId: string, nombre: string},
        @ConnectedSocket()
        socket: Socket
    ){
        socket.join(message.salaId);
        const mensajeBienvenida = {
            mensaje: `${message.nombre} se unió a la sala ${message.salaId}`
        }
        socket.broadcast.to(message.salaId)
            .emit('escucharEventoUnirseSala', mensajeBienvenida)
        return {mensaje: 'ok'}
    }

    @SubscribeMessage("enviarMensaje")
    enviarMensaje(
        @MessageBody()
        message: {salaId: string, nombre: string, mensaje: string},
        @ConnectedSocket()
        socket: Socket
    ){
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        }
        socket.broadcast
            .to(message.salaId)
            .emit('escucharEventoMensajeSala', mensajeSala)
        return {mensaje: 'ok'}
    }
}