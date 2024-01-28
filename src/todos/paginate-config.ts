import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Todo } from './todo.entity';

export const config: PaginateConfig<Todo> = {
  relations: ['subCategory'],
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id'],
  select: ['id', 'dueDate', 'isCompleted', 'createdAt', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    name: [FilterOperator.EQ, FilterSuffix.NOT],
    'subCategory.id': [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
