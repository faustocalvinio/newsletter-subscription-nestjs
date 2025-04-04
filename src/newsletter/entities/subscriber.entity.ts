import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subscriber {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ unique: true })
   email: string;
}
