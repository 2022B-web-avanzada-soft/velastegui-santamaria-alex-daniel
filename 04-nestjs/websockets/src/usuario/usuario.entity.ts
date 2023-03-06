import
{
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany
} from 'typeorm';
import {Nota} from "../nota/nota.entity";

@Entity('epn_usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'varchar',
        length: 60,
        nullable: false,
        name: 'user_nombres'
    })
    nombres: string;
    @Column({
        type: 'varchar',
        length: 60,
        nullable: false,
        name: 'user_apellidos'
    })
    apellidos: string;
    @Column({
        type: 'varchar',
        length: 1,
        nullable: false,
        name: 'user_rol',
        default: 'U',
        comment: 'U: Usuario, A: Administrador',
    })
    rol: string;
    @OneToMany(type => Nota, nota => nota.usuario)
    notas: Nota[];
}