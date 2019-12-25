import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BaseEntity
} from 'typeorm';

@Entity()
@Unique(['email'])
@Unique(['userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  token: string;
}
