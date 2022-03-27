/* eslint-disable prettier/prettier */
import { IBanner } from '../interfaces/banner.interface';
import { model, Schema, Document } from 'mongoose';

const bannerSchema: Schema = new Schema({
  banners: {
    type: [],
    required: true,
  },
  text: [
    {
      header: String,
      subText: Number,
    }
  ],
  current: {
    type: Boolean,
    required: true,
  },
},
{
  timestamps: true,
});

const BannerModel = model<IBanner & Document>('Banner', bannerSchema);

export default BannerModel;
