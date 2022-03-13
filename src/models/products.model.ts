/* eslint-disable prettier/prettier */
import { IProducts } from './../interfaces/products.interface';
import { model, Schema, Document } from 'mongoose';

const productSchema: Schema = new Schema({
    category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  resourceImages: {
    type: [],
    required: true,
  },
});

const ProductModel = model<IProducts & Document>('Product', productSchema);

export default ProductModel;
