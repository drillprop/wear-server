import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { User } from './User';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  imageUrl!: string;

  @Column()
  category: string;

  @ManyToOne(
    () => User,
    user => user.items
  )
  user: User;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt: Date;

  static searchItems(
    column?: string,
    argument?: string,
    take?: number,
    skip?: number,
    orderBy?: string,
    order?: 'ASC' | 'DESC'
  ) {
    return this.createQueryBuilder('item')
      .where(column ? `item.${column} ilike '%' || :name || '%'` : '', {
        name: argument
      })
      .skip(skip)
      .take(take)
      .orderBy(orderBy ? orderBy : '', order)
      .getMany();
  }
}
