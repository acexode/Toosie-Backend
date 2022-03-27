/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateBannerDTO } from '@dtos/banner.dto';
import { IBanner } from '@interfaces/banner.interface';
import BannerService from '@services/banner.service';

class BannerController {
  public BannerService = new BannerService();

  public getBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBannersData: IBanner[] = await this.BannerService.findAllBanner();

      res.status(200).json({ data: findAllBannersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBannerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BannerId: string = req.params.id;
      const findOneBannerData: IBanner = await this.BannerService.findBannerById(BannerId);

      res.status(200).json({ data: findOneBannerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBanner = async (req: any, res: Response, next: NextFunction) => {
    try {
      const BannerData: CreateBannerDTO = req.body;
      const createBannerData: IBanner = await this.BannerService.createBanner(BannerData);

      res.status(201).json({ data: createBannerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BannerId: string = req.params.id;
      const BannerData: CreateBannerDTO = req.body;
      const updateBannerData: IBanner = await this.BannerService.updateBanner(BannerId, BannerData);

      res.status(200).json({ data: updateBannerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BannerId: string = req.params.id;
      const deleteBannerData: IBanner = await this.BannerService.deleteBanner(BannerId);

      res.status(200).json({ data: deleteBannerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BannerController;
