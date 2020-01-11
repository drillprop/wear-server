import { Field, ID, ObjectType, registerEnumType, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Item } from './Item';
import { SearchUserInput } from '../graphql/user/users/SearchUserInput';
import { Order } from './Order';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER'
}

registerEnumType(UserRole, {
  name: 'UserRole'
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ select: false })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(type => UserRole)
  role: UserRole;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetToken?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resetTokenExpiry?: Date;

  @OneToMany(
    () => Item,
    item => item.user
  )
  items: Item[];

  @OneToMany(
    () => Order,
    order => order.user
  )
  orders: Order[];

  static searchUsers(params: SearchUserInput) {
    const queryBuilder = this.createQueryBuilder('item');
    const { column, argument, skip, take, orderBy, desc, role } = params;

    if (column && argument) {
      queryBuilder.andWhere(`${column} ilike '%' || :argument || '%'`, {
        argument
      });
    }
    if (skip) queryBuilder.skip(skip);
    if (take) queryBuilder.take(take);
    if (orderBy) queryBuilder.orderBy(orderBy, desc ? 'DESC' : 'ASC');
    if (role)
      queryBuilder.andWhere(`ROLE = :role`, {
        role
      });

    return queryBuilder.getMany();
  }

  static findAndSelectPassword(col: string, arg: string) {
    return this.createQueryBuilder('user')
      .where(`${col} = '${arg}'`)
      .addSelect('user.password')
      .getOne();
  }
}
