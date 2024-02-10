import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TodosService } from 'src/todos/todos.service';
import { MoveTodoDto } from './dto/move-todo.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private todosService: TodosService,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoriesRepository.find({
        relations: ['subCategories', 'subCategories.todos'],
      });

      const sortedCategories = categories.sort(
        (a, b) => a.position - b.position,
      );

      sortedCategories.forEach((category) => {
        category.subCategories.sort((a, b) => a.position - b.position);

        category.subCategories.forEach((subCategory) => {
          subCategory.todos.sort((a, b) => a.position - b.position);
        });
      });

      return sortedCategories;
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to retrieve categories',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(fields: FindOptionsWhere<Category>): Promise<Category | null> {
    return this.categoriesRepository.findOne({
      where: fields,
      relations: ['subCategories', 'subCategories.todos'],
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const categoriesCount = await this.categoriesRepository.count();
      return this.categoriesRepository.save(
        this.categoriesRepository.create({
          ...createCategoryDto,
          position: categoriesCount + 1,
        }),
      );
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to create category', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async moveTodo(
    id: Category['id'],
    moveTodoDto: MoveTodoDto,
  ): Promise<Category> {
    try {
      const {
        name,
        position,
        color,
        subCategories,
        todoId,
        destinationSubCategoryId,
      } = moveTodoDto;

      const newCategory = await this.categoriesRepository.save(
        this.categoriesRepository.create({
          id,
          name,
          position,
          color,
          subCategories,
        }),
      );

      await this.todosService.update(todoId, {
        subCategory: { id: destinationSubCategoryId },
      });

      return newCategory;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to update category', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(
    id: Category['id'],
    payload: DeepPartial<Category>,
  ): Promise<Category> {
    try {
      return this.categoriesRepository.save(
        this.categoriesRepository.create({
          id,
          ...payload,
        }),
      );
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to update category', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDelete(id: Category['id']): Promise<void> {
    try {
      const result = await this.categoriesRepository.softDelete(id);
      if (result.affected === 0) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to delete category', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
