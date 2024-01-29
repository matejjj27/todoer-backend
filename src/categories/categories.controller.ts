import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MoveTodoDto } from './dto/move-todo.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createProfileDto);
  }

  @Patch('moveTodo/:id')
  @HttpCode(HttpStatus.OK)
  moveTodo(
    @Param('id') id: string,
    @Body() moveTodoDto: MoveTodoDto,
  ): Promise<Category> {
    return this.categoriesService.moveTodo(id, moveTodoDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.softDelete(id);
  }
}
