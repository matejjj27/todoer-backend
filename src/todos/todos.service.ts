import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { config } from './paginate-config';
import { CreateTodoDto } from './dto/create-todo.dto';

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

  findOne(fields: FindOptionsWhere<Todo>): Promise<Todo | null> {
    return this.todosRepository.findOne({
      where: fields,
    });
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      return this.todosRepository.save(
        this.todosRepository.create(createTodoDto),
      );
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to create todo', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: Todo['id'], payload: DeepPartial<Todo>): Promise<Todo> {
    try {
      return this.todosRepository.save(
        this.todosRepository.create({
          id,
          ...payload,
        }),
      );
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to update todo', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDelete(id: Todo['id']): Promise<void> {
    try {
      const result = await this.todosRepository.softDelete(id);
      if (result.affected === 0) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to delete todo', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
