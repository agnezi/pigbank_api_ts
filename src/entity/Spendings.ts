import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Spendings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  registered_at: Date

  @Column()
  spending_date: Date

  @Column()
  category: string

  @Column()
  value: number

  @ManyToMany(type => Users, user => user.spendings)
  user: Users
}