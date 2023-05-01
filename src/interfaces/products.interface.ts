/* eslint-disable prettier/prettier */
export interface IProducts {
  _id: string
  category: string;
  title: string;
  description: string;
  ingredients: string;
  warning: string;
  actualPrice: number;
  discountPercent: number;
  tags: string[];
  brand: string;
  resourceImages: string[];
  isTrending: boolean;
  isSpecial: boolean;
  enabled: boolean
}
