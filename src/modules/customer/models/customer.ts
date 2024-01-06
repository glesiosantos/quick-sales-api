import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
