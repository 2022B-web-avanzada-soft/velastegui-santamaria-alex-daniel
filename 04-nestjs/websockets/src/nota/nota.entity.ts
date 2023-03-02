import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nota: number;
}