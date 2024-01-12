import ProductModel from './../../product/models/product'
import { Order } from './order'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('order_itens')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'product_id' })
  item: ProductModel

  @Column()
  quantity: number

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order
}
