import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Category } from './category.entity';

export const config: PaginateConfig<Category> = {
  relations: ['subCategories', 'subCategories.todos'],
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id', 'name', 'color'],
  select: [
    'id',
    'name',
    'color',
    'subCategories.(id)',
    'subCategories.(name)',
    'subCategories.(color)',
    'subCategories.(todos)',
    'createdAt',
    'updatedAt',
  ],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    name: [FilterOperator.EQ, FilterSuffix.NOT],
    color: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
