/* eslint-disable prettier/prettier */
import { Router } from 'express';
import BlogController from '@controllers/blog.controller';
import { CreateBlogDTO } from '@dtos/blog.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class BlogRoute implements Routes {
  public path = '/blog';
  public router = Router();
  public BlogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.BlogController.getBlogs);
    this.router.get(`${this.path}/:id`, this.BlogController.getBlogById);
    this.router.post(`${this.path}`, validationMiddleware(CreateBlogDTO, 'body'), this.BlogController.createBlog);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateBlogDTO, 'body', true), this.BlogController.updateBlog);
    this.router.delete(`${this.path}/:id`, this.BlogController.deleteBlog);
  }
}

export default BlogRoute;
