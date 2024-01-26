import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Todo>> {
    return this.todosService.findAll(query);
  }
}
