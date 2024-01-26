import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
