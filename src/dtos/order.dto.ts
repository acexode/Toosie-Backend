/* eslint-disable prettier/prettier */

import { IsString, IsArray, IsObject, IsNumber, IsOptional, IsBoolean } from 'class-validator';

class ShippingDTO {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsNumber()
  addressDeliveryCost: number;
}

export class CreateOrderDTO {
  @IsString()
  customerId: string;

  @IsString()
  @IsOptional()
  paymentId: string;

  @IsString()
  @IsOptional()
  paymentStatus: string;

  @IsString()
  @IsOptional()
  deliveryStatus: string;

  @IsString()
  paymentMethod: string;

  @IsBoolean()
  priorityDelivery: string;

  @IsNumber()
  @IsOptional()
  loyaltyPoint: number;

  @IsString()
  deliveryType: string;

  @IsNumber()
  totalCost: number;

  @IsArray()
  products: string[];

  @IsArray()
  orderDetails: string[];

  @IsObject()
  shipping: ShippingDTO;
}

