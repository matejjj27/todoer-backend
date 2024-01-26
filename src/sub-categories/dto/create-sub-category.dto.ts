import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/category.entity';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  category: Category;
}
