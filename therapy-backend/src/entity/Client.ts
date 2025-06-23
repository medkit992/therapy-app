// therapy-backend/src/entity/Client.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Note } from './Note';
import { Session } from './Session';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    emergencyContactName?: string;

    @Column({ nullable: true })
    emergencyContactPhone?: string;

    // (optional free-form notes)
    @Column({ type: 'text', nullable: true })
    notes?: string;

    @OneToMany(() => Note, note => note.client)
    notesRelation!: Note[];

    @OneToMany(() => Session, session => session.client)
    sessions!: Session[];
}
