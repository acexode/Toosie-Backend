/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateBlogDTO {
  
  @IsString()
  blogTitle: string;

  @IsString()
  blogContent: string;

  @IsString()
  blogImage: string;
}
