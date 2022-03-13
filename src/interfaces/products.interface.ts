/* eslint-disable prettier/prettier */
export interface IProducts {
  _id: string
  category: string;
  title: string;
  description: string;
  actualPrice: number;
  discountPercent: number;
  tags: string[];
  brand: string;
  resourceImages: string[];
}
