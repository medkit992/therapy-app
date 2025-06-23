import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    @IsNotEmpty({ message: "Sender ID is required" })
    senderId!: string;

    @Column()
    @IsNotEmpty({ message: "Recipient ID is required" })
    recipientId!: string;

    @Column("text")
    @IsNotEmpty({ message: "Content cannot be empty" })
    content!: string;

    @CreateDateColumn()
    sentAt!: Date;
}
