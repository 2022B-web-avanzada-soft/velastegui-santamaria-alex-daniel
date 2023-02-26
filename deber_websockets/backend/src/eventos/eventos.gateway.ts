import {
    ConnectedSocket,
    MessageBody,
    WebSocketGateway,
    SubscribeMessage
} from "@nestjs/websockets";
import {Socket} from "socket.io";

interface Moneda {
    id: number;
    nombre: string;
    valor: number;
}

@WebSocketGateway(
    8086, // Puerto donde escucha el servidor de websockets
    {
        cors: {
            origin: "*", // Habilitando la conexion desde cualquier IP
        }
    }
)
export class EventosGateway{
    @SubscribeMessage("cambiarValorMoneda")
    cambiarValorMoneda(
        @MessageBody()
        message: {moneda: Moneda, nuevoValor: number},
        @ConnectedSocket()
        socket: Socket
    ){
        socket.broadcast
            .emit(
                'escucharEventoCambiarValorMoneda',
                message
            )
        return {mensaje: 'ok'}
    }
}