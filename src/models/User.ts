import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatar: string

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date
}
