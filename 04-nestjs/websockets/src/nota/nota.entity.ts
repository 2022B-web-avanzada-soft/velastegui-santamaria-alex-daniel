import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "../usuario/usuario.entity";

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nota: number;
  @ManyToOne(type => Usuario, usuario => usuario.notas)
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}