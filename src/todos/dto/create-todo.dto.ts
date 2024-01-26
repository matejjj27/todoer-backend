import { IsNotEmpty } from 'class-validator';
import { SubCategory } from 'src/sub-categories/sub-category.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  isCompleted: boolean;

  @IsNotEmpty()
  subCategory: SubCategory;
}