import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/category.entity';

export class UpdateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  category: Category;
}
