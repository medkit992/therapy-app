import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { Session } from './Session';

export enum NoteType {
    CLIENT = 'client',
    SESSION = 'session',
}

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    type!: NoteType;


    @Column({ nullable: true })
    clientId?: number;
    @ManyToOne(() => Client, c => c.notes)
    client?: Client;

    @Column({ nullable: true })
    sessionId?: number;
    @ManyToOne(() => Session, s => s.notes)
    session?: Session;

    @Column({ type: 'text' })
    dateTime!: string;

    @Column()
    title!: string;

    @Column('text')
    content!: string;

    @Column('simple-array', { nullable: true })
    tags?: string[];

    @Column({ type: 'int', nullable: true })
    mood?: number;

    @Column('simple-json', { nullable: true })
    followUps?: string[];

    @Column({ nullable: true })
    audioUrl?: string;

    @Column('text', { nullable: true })
    summary?: string;

    @CreateDateColumn({ type: 'text' })
    createdAt!: string;
}
