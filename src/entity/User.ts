import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BaseEntity,
  CreateDateColumn
} from 'typeorm';

enum UserRole {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Customer = 'CUSTOMER'
}

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

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
