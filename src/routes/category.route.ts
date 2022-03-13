/* eslint-disable prettier/prettier */
import { Router } from 'express';
import CategoryController from '@controllers/category.controller';
import { CreateCategoryDTO } from '@dtos/category.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CategoryRoute implements Routes {
  public path = '/category';
  public router = Router();
  public CategoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CategoryController.getCategorys);
    this.router.get(`${this.path}/:id`, this.CategoryController.getCategoryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDTO, 'body'), this.CategoryController.createCategory);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCategoryDTO, 'body', true), this.CategoryController.updateCategory);
    this.router.delete(`${this.path}/:id`, this.CategoryController.deleteCategory);
  }
}

export default CategoryRoute;
