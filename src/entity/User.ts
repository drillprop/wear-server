import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BaseEntity
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  token: string;

  static findByEmail(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  static findById(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
