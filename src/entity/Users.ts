import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Earnings } from './Earnings';
import { Spendings } from './Spendings';

@Entity()
export class Users {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(type => Earnings, earnings => earnings.user)
  earnings: Earnings[]

  @OneToMany(type => Spendings, spendings => spendings.user)
  spendings: Spendings[]

  @Column({
    select: false
  })
  password: string;
}
