import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Todo } from './todo.entity';

export const config: PaginateConfig<Todo> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id'],
  select: ['id', 'dueDate', 'isCompleted', 'createdAt', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    name: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
