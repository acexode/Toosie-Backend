/* eslint-disable prettier/prettier */
import { CreateBannerDTO } from '@dtos/banner.dto';
import { HttpException } from '@exceptions/HttpException';
import { IBanner } from '@interfaces/banner.interface';

import { isEmpty } from '@utils/util';
import BannerModel from '@/models/banner.model';

class BannerService {
  public Banners = BannerModel;

  public async findAllBanner(): Promise<IBanner[]> {
    const Banners: IBanner[] = await this.Banners.find()
    return Banners;
  }

  public async findBannerById(BannerId: string): Promise<IBanner> {
    if (isEmpty(BannerId)) throw new HttpException(400, "You're not BannerId");

    const findBanner: IBanner = await this.Banners.findOne({ _id: BannerId });
    if (!findBanner) throw new HttpException(409, "You're not Banner");

    return findBanner;
  }

  public async createBanner(BannerData: CreateBannerDTO): Promise<IBanner> {
    if (isEmpty(BannerData)) throw new HttpException(400, "You're not BannerData");
    const createBannerData: IBanner = await this.Banners.create(BannerData);
    console.log(createBannerData)
    return createBannerData;
  }

  public async updateBanner(BannerId: string, BannerData: CreateBannerDTO): Promise<IBanner> {
    if (isEmpty(BannerData)) throw new HttpException(400, "You're not BannerData");

    if (BannerId) {
      const findBanner: IBanner = await this.Banners.findOne({ _id: BannerId });
      if (!findBanner) throw new HttpException(409, `Banner does not  exists`);
    }

    const updateBannerById: IBanner = await this.Banners.findByIdAndUpdate(BannerId, { BannerData });
    if (!updateBannerById) throw new HttpException(409, 'Failed to update Banner');

    return updateBannerById;
  }

  public async deleteBanner(BannerId: string): Promise<IBanner> {
    const deleteBannerById: IBanner = await this.Banners.findByIdAndDelete(BannerId);
    if (!deleteBannerById) throw new HttpException(409, 'Failed to delete Banner');

    return deleteBannerById;
  }
}

export default BannerService;
