import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderItem } from './order_item'
import { Customer } from './../../customer/models/customer'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrderItem, item => item.order)
  itens: OrderItem[]

  @Column({ name: 'is_budget' })
  isBudget: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
