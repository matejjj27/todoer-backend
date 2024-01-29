import { SubCategory } from 'src/sub-categories/sub-category.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'red' })
  color: string;

  @Column()
  position: number;

  @OneToMany(
    () => SubCategory,
    (subCategory: SubCategory) => subCategory.category,
    { cascade: true },
  )
  subCategories: SubCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
