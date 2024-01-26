import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { SubCategory } from './sub-category.entity';

export const config: PaginateConfig<SubCategory> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id'],
  select: ['createdAt', 'id', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
