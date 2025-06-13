import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subscriber {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ unique: true })
   email: string;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   dateOfSubscription: Date;

   @Column({
      type: "enum",
      enum: ["lacapital", "rosario3", "propias"],
      default: "propias",
   })
   option: "lacapital" | "rosario3" | "propias";
}
