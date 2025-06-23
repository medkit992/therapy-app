import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { IsInt, Min, IsNotEmpty, IsDateString } from "class-validator";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Client, (client) => client.invoices, { onDelete: "CASCADE" })
    client!: Client;

    @Column("int")
    @IsInt({ message: "Amount must be integer" })
    @Min(0, { message: "Amount cannot be negative" })
    amountCents!: number;

    @Column()
    @IsNotEmpty({ message: "Status is required" })
    status!: string;

    @Column({ type: "date" })
    @IsDateString({}, { message: "Issued date must be YYYY-MM-DD" })
    issuedDate!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
