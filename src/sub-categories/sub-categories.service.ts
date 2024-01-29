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
    private subCategoriesRepository: Repository<SubCategory>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<SubCategory>> {
    try {
      return await paginate(query, this.subCategoriesRepository, config);
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
    return this.subCategoriesRepository.findOne({
      where: fields,
      relations: ['todos'],
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<SubCategory> {
    try {
      const subCategoriesCount = await this.subCategoriesRepository.count();
      return this.subCategoriesRepository.save(
        this.subCategoriesRepository.create({
          ...createCategoryDto,
          position: subCategoriesCount + 1,
        }),
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
      return this.subCategoriesRepository.save(
        this.subCategoriesRepository.create({
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
      const result = await this.subCategoriesRepository.softDelete(id);
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
