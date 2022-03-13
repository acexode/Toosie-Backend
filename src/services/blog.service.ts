/* eslint-disable prettier/prettier */
import { CreateBlogDTO } from '@dtos/blog.dto';
import { HttpException } from '@exceptions/HttpException';
import { IBlog } from '@interfaces/blog.interface';

import { isEmpty } from '@utils/util';
import BlogModel from '@/models/blog.model';

class BlogService {
  public Blogs = BlogModel;

  public async findAllBlog(): Promise<IBlog[]> {
    const Blogs: IBlog[] = await this.Blogs.find();
    return Blogs;
  }

  public async findBlogById(BlogId: string): Promise<IBlog> {
    if (isEmpty(BlogId)) throw new HttpException(400, "You're not BlogId");

    const findBlog: IBlog = await this.Blogs.findOne({ _id: BlogId });
    if (!findBlog) throw new HttpException(409, "You're not Blog");

    return findBlog;
  }

  public async createBlog(BlogData: CreateBlogDTO): Promise<IBlog> {
    if (isEmpty(BlogData)) throw new HttpException(400, "You're not BlogData");

    const findBlog: IBlog = await this.Blogs.findOne({ blogTitle: BlogData.blogTitle });
    if (findBlog) throw new HttpException(409, `Blog with this ${BlogData.blogTitle} already exists`);

    const createBlogData: IBlog = await this.Blogs.create(BlogData);

    return createBlogData;
  }

  public async updateBlog(BlogId: string, BlogData: CreateBlogDTO): Promise<IBlog> {
    if (isEmpty(BlogData)) throw new HttpException(400, "You're not BlogData");

    if (BlogId) {
      const findBlog: IBlog = await this.Blogs.findOne({ _id: BlogId });
      if (!findBlog) throw new HttpException(409, `Blog does not  exists`);
    }

    const updateBlogById: IBlog = await this.Blogs.findByIdAndUpdate(BlogId, { BlogData });
    if (!updateBlogById) throw new HttpException(409, 'Failed to update blog');

    return updateBlogById;
  }

  public async deleteBlog(BlogId: string): Promise<IBlog> {
    const deleteBlogById: IBlog = await this.Blogs.findByIdAndDelete(BlogId);
    if (!deleteBlogById) throw new HttpException(409, 'Failed to delete blog');

    return deleteBlogById;
  }
}

export default BlogService;
