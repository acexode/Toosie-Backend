/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateBlogDTO } from '@dtos/blog.dto';
import { IBlog } from '@interfaces/blog.interface';
import BlogService from '@services/blog.service';

class BlogController {
  public BlogService = new BlogService();

  public getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBlogsData: IBlog[] = await this.BlogService.findAllBlog();

      res.status(200).json({ data: findAllBlogsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBlogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BlogId: string = req.params.id;
      const findOneBlogData: IBlog = await this.BlogService.findBlogById(BlogId);

      res.status(200).json({ data: findOneBlogData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BlogData: CreateBlogDTO = req.body;
      const createBlogData: IBlog = await this.BlogService.createBlog(BlogData);

      res.status(201).json({ data: createBlogData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BlogId: string = req.params.id;
      const BlogData: CreateBlogDTO = req.body;
      const updateBlogData: IBlog = await this.BlogService.updateBlog(BlogId, BlogData);

      res.status(200).json({ data: updateBlogData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BlogId: string = req.params.id;
      const deleteBlogData: IBlog = await this.BlogService.deleteBlog(BlogId);

      res.status(200).json({ data: deleteBlogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BlogController;
