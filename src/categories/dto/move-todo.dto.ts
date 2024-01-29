import { IsNotEmpty } from 'class-validator';
import { SubCategory } from 'src/sub-categories/sub-category.entity';

export class MoveTodoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  position: number;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  subCategories: SubCategory[];

  @IsNotEmpty()
  todoId: string;

  @IsNotEmpty()
  destinationSubCategoryId: string;
}
