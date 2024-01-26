import { SubCategory } from 'src/sub-categories/sub-category.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.todos)
  subCategory: SubCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
