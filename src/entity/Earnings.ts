import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Earnings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  registered_at: Date

  @Column()
   earning_date: Date

  @Column()
  type: string

  @Column()
  category: string

  @Column()
  value: number

  @ManyToOne(type => Users, user => user.earnings)
  user: Users
}