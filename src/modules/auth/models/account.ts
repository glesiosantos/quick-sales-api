import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('accounts')
export class AccountModel {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  avatar: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'is_admin' })
  isAdmin: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
