import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { config } from './paginate-config';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Category>> {
    try {
      return await paginate(query, this.categoriesRepository, config);
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
}
