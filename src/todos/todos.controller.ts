import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Todo>> {
    return this.todosService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Todo | null> {
    return this.todosService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createProfileDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.todosService.softDelete(id);
  }
}
