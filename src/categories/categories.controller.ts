import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Category>> {
    return this.categoriesService.findAll(query);
  }
}
