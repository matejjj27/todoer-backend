import { IsNotEmpty, IsOptional } from 'class-validator';
import { SubCategory } from 'src/sub-categories/sub-category.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  isCompleted: boolean;

  @IsNotEmpty()
  subCategory: SubCategory;
}
