/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateCategoryDTO {
    
    @IsString()
    public categoryImage: string;

    @IsString()
    public category: string;
}
