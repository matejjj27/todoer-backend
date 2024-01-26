import { Category } from 'src/categories/category.entity';
import { Todo } from 'src/todos/todo.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Todo, (todo: Todo) => todo.subCategory)
  todos: Todo[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
