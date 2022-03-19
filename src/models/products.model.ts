/* eslint-disable prettier/prettier */
import { IProducts } from './../interfaces/products.interface';
import { model, Schema, Document } from 'mongoose';

const productSchema: Schema = new Schema({
    category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortSummary: {
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
    type: [],
    required: false,
  },
  brand: {
    type: String,
    required: true,
  },
  isTrending: {
    type: Boolean,
    required: true,
  },
  isSpecial: {
    type: Boolean,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  resourceImages: {
    type: [],
    required: true,
  },
},
{
  timestamps: true,
});

const ProductModel = model<IProducts & Document>('Product', productSchema);

export default ProductModel;
