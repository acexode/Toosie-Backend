/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateCategoryDTO } from '@dtos/category.dto';
import { ICategory } from '@interfaces/category.interface';
import CategoryService from '@services/category.service';

class CategoryController {
  public CategoryService = new CategoryService();

  public getCategorys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCategorysData: ICategory[] = await this.CategoryService.findAllCategory();

      res.status(200).json({ data: findAllCategorysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId: string = req.params.id;
      const findOneCategoryData: ICategory = await this.CategoryService.findCategoryById(CategoryId);

      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryData: CreateCategoryDTO = req.body;
      const createCategoryData: ICategory = await this.CategoryService.createCategory(CategoryData);

      res.status(201).json({ data: createCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId: string = req.params.id;
      const CategoryData: CreateCategoryDTO = req.body;
      const updateCategoryData: ICategory = await this.CategoryService.updateCategory(CategoryId, CategoryData);

      res.status(200).json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId: string = req.params.id;
      const deleteCategoryData: ICategory = await this.CategoryService.deleteCategory(CategoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
