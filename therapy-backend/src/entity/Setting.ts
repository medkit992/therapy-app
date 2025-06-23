import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    @IsNotEmpty({ message: "Key is required" })
    key!: string;

    @Column("text")
    @IsNotEmpty({ message: "Value is required" })
    value!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
