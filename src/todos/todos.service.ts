import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { config } from './paginate-config';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Todo>> {
    try {
      return await paginate(query, this.todosRepository, config);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to retrieve todos',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
