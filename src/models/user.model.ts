import { Column, Table, Model } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: true })
  phone: string;

  @Column({ allowNull: false })
  password: string;
}
