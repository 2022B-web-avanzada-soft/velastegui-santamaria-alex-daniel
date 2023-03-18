import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('producto')
export class ProductoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        name: 'producto_nombre',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    nombre: string;
    @Column({
        name: 'producto_cantidad',
        type: 'int',
    })
    cantidad: number;
    @Column({
        name: 'producto_precio',
        type: 'double',
    })
    precio: number;
    @Column({
        name: 'producto_tieneIVA',
        type: 'boolean',
    })
    tieneIva: boolean;


}