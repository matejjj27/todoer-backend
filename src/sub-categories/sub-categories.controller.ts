import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { SubCategory } from './sub-category.entity';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<SubCategory>> {
    return this.subCategoriesService.findAll(query);
  }
}
