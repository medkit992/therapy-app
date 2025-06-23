import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { IsNotEmpty, IsUrl, IsOptional } from "class-validator";

@Entity()
export class VoiceNote {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Client, (client) => client.voiceNotes, { onDelete: "CASCADE" })
    client!: Client;

    @Column()
    @IsUrl({}, { message: "URL must be valid" })
    url!: string;

    @Column("text", { nullable: true })
    @IsOptional()
    @IsNotEmpty({ message: "Transcript cannot be empty string" })
    transcript!: string | null;

    @CreateDateColumn()
    createdAt!: Date;
}
