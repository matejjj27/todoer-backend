import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      return this.categoriesRepository.find({
        relations: ['subCategories', 'subCategories.todos'],
      });
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
      relations: ['subCategories'],
    });
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return this.categoriesRepository.save(
        this.categoriesRepository.create(createCategoryDto),
      );
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to create category', status: HttpStatus.BAD_REQUEST },
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
