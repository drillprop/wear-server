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
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true, name: 'address_line1' })
  @Field({ nullable: true })
  addressLine1: string;

  @Column({ nullable: true, name: 'address_line2' })
  @Field({ nullable: true })
  addressLine2: string;

  @Column({ nullable: true, name: 'zip_code' })
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
