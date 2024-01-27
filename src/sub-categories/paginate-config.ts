import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { SubCategory } from './sub-category.entity';

export const config: PaginateConfig<SubCategory> = {
  relations: ['todos', 'category'],
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id', 'name', 'color'],
  select: [
    'id',
    'name',
    'color',
    'todos.(id)',
    'todos.(name)',
    'todos.(dueDate)',
    'todos.(isCompleted)',
    'createdAt',
    'updatedAt',
  ],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    name: [FilterOperator.EQ, FilterSuffix.NOT],
    color: [FilterOperator.EQ, FilterSuffix.NOT],
    'category.id': [FilterOperator.EQ],
  },
};
