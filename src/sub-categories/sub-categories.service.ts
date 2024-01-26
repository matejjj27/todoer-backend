import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { config } from './paginate-config';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private categoriesRepository: Repository<SubCategory>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<SubCategory>> {
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
