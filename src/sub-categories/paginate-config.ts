import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { SubCategory } from './sub-category.entity';

export const config: PaginateConfig<SubCategory> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['createdAt', 'ASC']],
  searchableColumns: ['id', 'name', 'color'],
  select: ['createdAt', 'id', 'updatedAt'],
  filterableColumns: {
    id: [FilterOperator.EQ, FilterSuffix.NOT],
    name: [FilterOperator.EQ, FilterSuffix.NOT],
    color: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};
