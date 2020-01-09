import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SearchUserInput } from '../graphql/user/user.inputs';
import { Item } from './Item';

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

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(type => UserRole)
  role: UserRole;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Item,
    item => item.user
  )
  items: Item[];

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

  static findByEmail(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }
}
