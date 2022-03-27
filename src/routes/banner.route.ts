/* eslint-disable prettier/prettier */
import { Router } from 'express';
import BannerController from '@controllers/banner.controller';
import { CreateBannerDTO } from '@dtos/banner.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class BannerRoute implements Routes {
  public path = '/banner';
  public router = Router();
  public BannerController = new BannerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.BannerController.getBanners);
    this.router.get(`${this.path}/:id`, this.BannerController.getBannerById);
    this.router.post(`${this.path}`, validationMiddleware(CreateBannerDTO, 'body'), this.BannerController.createBanner);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateBannerDTO, 'body', true), this.BannerController.updateBanner);
    this.router.delete(`${this.path}/:id`, this.BannerController.deleteBanner);
  }
}

export default BannerRoute;
