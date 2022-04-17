/* eslint-disable prettier/prettier */
import { IsString, IsDateString } from 'class-validator';

export class CreateRefillDTO {

  @IsString()
  customerId: string;

  @IsString()
  frequencyInterval: string;

  @IsString()
  prescriptionImage: [];

  @IsString()
  frequency: string;

  @IsDateString()
  startDate: Date;

  @IsString()
  otherInformation: string;

  @IsString()
  productId: string;
}
