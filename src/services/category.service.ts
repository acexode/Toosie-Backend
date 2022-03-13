/* eslint-disable prettier/prettier */
import { CreateCategoryDTO } from '@dtos/category.dto';
import { HttpException } from '@exceptions/HttpException';
import { ICategory } from '@interfaces/category.interface';

import { isEmpty } from '@utils/util';
import CategoryModel from '@/models/category.model';

class CategoryService {
  public Categorys = CategoryModel;

  public async findAllCategory(): Promise<ICategory[]> {
    const Categorys: ICategory[] = await this.Categorys.find();
    return Categorys;
  }

  public async findCategoryById(CategoryId: string): Promise<ICategory> {
    if (isEmpty(CategoryId)) throw new HttpException(400, "You're not CategoryId");

    const findCategory: ICategory = await this.Categorys.findOne({ _id: CategoryId });
    if (!findCategory) throw new HttpException(409, "You're not Category");

    return findCategory;
  }

  public async createCategory(CategoryData: CreateCategoryDTO): Promise<ICategory> {
    if (isEmpty(CategoryData)) throw new HttpException(400, "You're not CategoryData");

    const findCategory: ICategory = await this.Categorys.findOne({ category: CategoryData.category });
    if (findCategory) throw new HttpException(409, `Category with this ${CategoryData.category} already exists`);

    const createCategoryData: ICategory = await this.Categorys.create(CategoryData);

    return createCategoryData;
  }

  public async updateCategory(CategoryId: string, CategoryData: CreateCategoryDTO): Promise<ICategory> {
    if (isEmpty(CategoryData)) throw new HttpException(400, "You're not CategoryData");

    if (CategoryId) {
      const findCategory: ICategory = await this.Categorys.findOne({ _id: CategoryId });
      if (!findCategory) throw new HttpException(409, `Category does not  exists`);
    }

    const updateCategoryById: ICategory = await this.Categorys.findByIdAndUpdate(CategoryId, { CategoryData });
    if (!updateCategoryById) throw new HttpException(409, 'Failed to update Category');

    return updateCategoryById;
  }

  public async deleteCategory(CategoryId: string): Promise<ICategory> {
    const deleteCategoryById: ICategory = await this.Categorys.findByIdAndDelete(CategoryId);
    if (!deleteCategoryById) throw new HttpException(409, 'Failed to delete Category');

    return deleteCategoryById;
  }
}

export default CategoryService;
