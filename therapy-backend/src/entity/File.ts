import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { IsNotEmpty } from "class-validator";

@Entity()
export class File {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Client, (client) => client.files, { onDelete: "CASCADE" })
    client!: Client;

    @Column()
    @IsNotEmpty({ message: "Filename is required" })
    filename!: string;

    @Column()
    @IsNotEmpty({ message: "Path is required" })
    path!: string;

    @CreateDateColumn()
    uploadedAt!: Date;
}
