import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Todo } from './todo.entity';

export const config: PaginateConfig<Todo> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id'],
  select: ['createdAt', 'id', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
