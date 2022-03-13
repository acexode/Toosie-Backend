/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateProductsDTO } from '@dtos/products.dto';
import { IProducts } from '@interfaces/products.interface';
import ProductService from '@services/products.service';

class ProductController {
  public ProductService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: IProducts[] = await this.ProductService.findAllProduct();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId: string = req.params.id;
      const findOneProductData: IProducts = await this.ProductService.findProductById(ProductId);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductData: CreateProductsDTO = req.body;
      const createProductData: IProducts = await this.ProductService.createProduct(ProductData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId: string = req.params.id;
      const ProductData: CreateProductsDTO = req.body;
      const updateProductData: IProducts = await this.ProductService.updateProduct(ProductId, ProductData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId: string = req.params.id;
      const deleteProductData: IProducts = await this.ProductService.deleteProduct(ProductId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
