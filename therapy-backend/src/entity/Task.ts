import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import {
    IsNotEmpty,
    IsDateString,
    IsBoolean,
} from "class-validator";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Client, (client) => client.tasks, { onDelete: "CASCADE" })
    client!: Client;

    @Column()
    @IsNotEmpty({ message: "Title is required" })
    title!: string;

    @Column({ type: "date", nullable: true })
    @IsDateString({}, { message: "Due date must be YYYY-MM-DD" })
    dueDate!: string | null;

    @Column({ default: false })
    @IsBoolean({ message: "Completed must be true or false" })
    completed!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
}
