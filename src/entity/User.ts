import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 120 })
    name: string;

    @Column({ type: 'tinyint' })
    age: number;

    @Column({ default: true })
    enabled: boolean;

    @CreateDateColumn()
    createdAt; Date;

    @Column({ type: Date, nullable: true, default: null })
    deletedAt: Date | null;

}
