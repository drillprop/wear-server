import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  addressLine1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @OneToOne(
    type => User,
    user => user.address
  )
  user: User;
}
