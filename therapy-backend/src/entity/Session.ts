// therapy-backend/src/entity/Session.ts
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn
} from 'typeorm';
import { Client } from './Client';

export enum SessionType {
    INDIVIDUAL = 'individual',
    GROUP = 'group',
    ASSESSMENT = 'assessment',
}

@Entity()
export class Session {
    @PrimaryGeneratedColumn() id!: number;

    @Column() date!: string;     // YYYY-MM-DD
    @Column() time!: string;     // HH:mm
    @Column() duration!: number; // in minutes

    @Column({ nullable: true }) location?: string;

    @Column({ default: false }) isTelehealth!: boolean;
    @Column({ nullable: true }) telehealthId?: string;
    @Column({ nullable: true }) telehealthUrl?: string;

    @Column({ type: 'int', default: 10 })
    reminderOffset!: number;   // minutes before

    @Column({ type: 'enum', enum: SessionType, default: SessionType.INDIVIDUAL })
    sessionType!: SessionType;

    @Column({ type: 'simple-array', nullable: true })
    attachments?: string[];    // URLs of uploaded files

    @Column({ type: 'int', nullable: true })
    moodRating?: number;       // 1–10

    @Column({ nullable: true })
    notes?: string;

    @Column({ nullable: true })
    recurrenceRule?: string;   // iCal RRULE string

    @ManyToOne(() => Client, (c) => c.sessions, { onDelete: 'CASCADE' })
    client!: Client;

    @CreateDateColumn() createdAt!: Date;
}
