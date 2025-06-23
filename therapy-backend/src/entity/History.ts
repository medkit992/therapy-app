import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class History {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    @IsNotEmpty({ message: "Entity name is required" })
    entity!: string;

    @Column()
    @IsNotEmpty({ message: "Entity ID is required" })
    entityId!: string;

    @Column("json")
    @IsNotEmpty({ message: "Changes payload is required" })
    changes!: any;

    @CreateDateColumn()
    changedAt!: Date;
}
