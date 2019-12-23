import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BaseEntity
} from 'typeorm';

@Entity()
@Unique(['email', 'userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
