import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @Column({ unique: true, length: 11 })
  cpf!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ name: 'favorite_color', length: 30 })
  favoriteColor!: string;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}