/* eslint-disable prettier/prettier */
import { CreateProductsDTO } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { IProducts } from '@interfaces/products.interface';

import { isEmpty } from '@utils/util';
import ProductModel from '@/models/products.model';

import 'dotenv/config';


class ProductService {
  public Products = ProductModel;

  public async findAllProduct(query): Promise<IProducts[]> {
    const Products: IProducts[] = await this.Products.find(query);
    return Products;
  }
  public async searchProduct(query): Promise<IProducts[]> {
    const Products: IProducts[] = await this.Products.find({ $text : { $search : query.searchString } });
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
  public fileFilter(req, file, cb){
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      //reject file
      cb({
        message: 'Unsupported file format'
      }, false)
    }
  }


}

export default ProductService;

