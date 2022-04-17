/* eslint-disable prettier/prettier */
import { Router } from 'express';
import ProductController from '@controllers/products.controller';
import { CreateProductsDTO } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import multer from '@services/multer-upload'
class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public ProductController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductController.getProducts);
    this.router.get(`${this.path}/:id`, this.ProductController.getProductById);
    this.router.get(`searchProduct`, this.ProductController.searchProducts);
    this.router.post(`${this.path}/uploadMedia`, multer.array('upload',12), this.ProductController.uploadMedia);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductsDTO, 'body'), this.ProductController.createProduct);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductsDTO, 'body', true), this.ProductController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.ProductController.deleteProduct);
  }
}

export default ProductRoute;
