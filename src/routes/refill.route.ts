/* eslint-disable prettier/prettier */
import { Router } from 'express';
import RefillController from '@controllers/refill.controller';
import { CreateRefillDTO } from '@dtos/refill.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RefillRoute implements Routes {
  public path = '/refill';
  public router = Router();
  public RefillController = new RefillController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.RefillController.getRefills);
    this.router.get(`${this.path}/:id`, this.RefillController.getRefillById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRefillDTO, 'body'), this.RefillController.createRefill);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateRefillDTO, 'body', true), this.RefillController.updateRefill);
    this.router.delete(`${this.path}/:id`, this.RefillController.deleteRefill);
  }
}

export default RefillRoute;
