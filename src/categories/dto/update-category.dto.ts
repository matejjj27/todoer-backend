import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  position: number;

  @IsNotEmpty()
  color: string;
}
