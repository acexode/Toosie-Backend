/* eslint-disable prettier/prettier */
import { ICategory } from './../interfaces/category.interface';
import { model, Schema, Document } from 'mongoose';

const categorySchema: Schema = new Schema({
  categoryImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const CategoryModel = model<ICategory & Document>('Category', categorySchema);

export default CategoryModel;
