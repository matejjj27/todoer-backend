import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { SubCategory } from 'src/sub-categories/sub-category.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  isCompleted: boolean;

  @IsNotEmpty()
  position: number;

  @IsNotEmpty()
  @ValidateNested()
  subCategory: SubCategory;
}
