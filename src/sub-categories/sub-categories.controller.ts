import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { SubCategory } from 'src/sub-categories/sub-category.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<SubCategory | null> {
    return this.subCategoriesService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateSubCategoryDto): Promise<SubCategory> {
    return this.subCategoriesService.create(createProfileDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoriesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.subCategoriesService.softDelete(id);
  }
}
