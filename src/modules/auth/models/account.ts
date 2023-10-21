import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('accounts')
export default class AccountModel {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    username: string
    
    @Column()
    email: string

    @Column({name: 'is_active'})
    isActive: boolean

    @Column({name: 'is_admin'})
    isAdmin: boolean
    
    @Column()
    password: string

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date 
}