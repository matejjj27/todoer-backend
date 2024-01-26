import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { config } from './paginate-config';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

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

  findOne(fields: FindOptionsWhere<SubCategory>): Promise<SubCategory | null> {
    return this.categoriesRepository.findOne({
      where: fields,
      relations: ['todos'],
    });
  }

  create(createCategoryDto: CreateCategoryDto): Promise<SubCategory> {
    try {
      return this.categoriesRepository.save(
        this.categoriesRepository.create(createCategoryDto),
      );
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to create subCategory',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(
    id: SubCategory['id'],
    payload: DeepPartial<SubCategory>,
  ): Promise<SubCategory> {
    try {
      return this.categoriesRepository.save(
        this.categoriesRepository.create({
          id,
          ...payload,
        }),
      );
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to update subCategory',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDelete(id: SubCategory['id']): Promise<void> {
    try {
      const result = await this.categoriesRepository.softDelete(id);
      if (result.affected === 0) {
        throw new HttpException('subCategory not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to delete subCategory',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
