import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/category.entity';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  position: number;

  @IsNotEmpty()
  category: Category;
}
