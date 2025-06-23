// therapy-backend/src/entity/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    @IsEmail({}, { message: "Must be a valid email" })
    email!: string;

    @Column()
    @Length(8, 100, { message: "Password must be at least 8 characters" })
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
