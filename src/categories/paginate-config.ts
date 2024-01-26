import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Category } from './category.entity';

export const config: PaginateConfig<Category> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id'],
  select: ['createdAt', 'id', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
