/* eslint-disable prettier/prettier */
import { IBlog } from './../interfaces/blog.interface';
import { model, Schema, Document } from 'mongoose';

const blogSchema: Schema = new Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  blogAuthor:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
{
  timestamps: true,
});

const BlogModel = model<IBlog & Document>('Blog', blogSchema);

export default BlogModel;
