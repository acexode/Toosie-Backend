/* eslint-disable prettier/prettier */
const cloudinary = require('cloudinary').v2
import { CreateProductsDTO } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { IProducts } from '@interfaces/products.interface';

import { isEmpty } from '@utils/util';
import ProductModel from '@/models/products.model';

import 'dotenv/config';


class ProductService {
  public Products = ProductModel;
  constructor(){
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }
  public async findAllProduct(): Promise<IProducts[]> {
    const Products: IProducts[] = await this.Products.find();
    return Products;
  }

  public async findProductById(ProductId: string): Promise<IProducts> {
    if (isEmpty(ProductId)) throw new HttpException(400, "You're not ProductId");

    const findProduct: IProducts = await this.Products.findOne({ _id: ProductId });
    if (!findProduct) throw new HttpException(409, "You're not Product");

    return findProduct;
  }

  public async createProduct(ProductData: CreateProductsDTO): Promise<IProducts> {
    if (isEmpty(ProductData)) throw new HttpException(400, "You're not ProductData");

    const findProduct: IProducts = await this.Products.findOne({ title: ProductData.title });
    if (findProduct) throw new HttpException(409, `Product with this ${ProductData.title} already exists`);

    const createProductData: IProducts = await this.Products.create(ProductData);

    return createProductData;
  }

  public async updateProduct(ProductId: string, ProductData: CreateProductsDTO): Promise<IProducts> {
    if (isEmpty(ProductData)) throw new HttpException(400, "You're not ProductData");

    if (ProductId) {
      const findProduct: IProducts = await this.Products.findOne({ _id: ProductId });
      if (!findProduct) throw new HttpException(409, `Product does not  exists`);
    }

    const updateProductById: IProducts = await this.Products.findByIdAndUpdate(ProductId, { ProductData });
    if (!updateProductById) throw new HttpException(409, 'Failed to update Product');

    return updateProductById;
  }

  public async deleteProduct(ProductId: string): Promise<IProducts> {
    const deleteProductById: IProducts = await this.Products.findByIdAndDelete(ProductId);
    if (!deleteProductById) throw new HttpException(409, 'Failed to delete Product');

    return deleteProductById;
  }
  public async uploadMedia (file, folder)  {
    return new Promise(resolve => {
      cloudinary.uploader.upload(
        file,
        result => {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        },
        {
          resource_type: 'auto',
          folder: folder,
        },
      );
    });
  };

}

export default ProductService;

