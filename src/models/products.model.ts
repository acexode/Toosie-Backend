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
  ingredients: {
    type: String,
  },
  warning: {
    type: String,
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
    index: true,
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
productSchema.index({
  tags: 'text',
  title: 'text',
  brand: 'text',
  description: 'text',
  category: 'text',
})

const ProductModel = model<IProducts & Document>('Product', productSchema);

export default ProductModel;
