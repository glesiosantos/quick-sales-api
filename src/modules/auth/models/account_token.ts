import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { AccountModel } from './account'

@Entity('tokens')
export class AccountTokenModel {
  @PrimaryGeneratedColumn()
  id: string

  @OneToOne(() => AccountModel)
  @JoinColumn({ name: 'account_id' })
  account: AccountModel

  @Column()
  token: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
