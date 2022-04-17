/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateRefillDTO } from '@dtos/refill.dto';
import { IRefill } from '@interfaces/refill';
import RefillService from '@services/refill.service';

class RefillController {
  public RefillService = new RefillService();

  public getRefills = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRefillsData: IRefill[] = await this.RefillService.findAllRefill();

      res.status(200).json({ data: findAllRefillsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRefillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RefillId: string = req.params.id;
      const findOneRefillData: IRefill = await this.RefillService.findRefillById(RefillId);

      res.status(200).json({ data: findOneRefillData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRefill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RefillData: CreateRefillDTO = req.body;
      const createRefillData: IRefill = await this.RefillService.createRefill(RefillData);

      res.status(201).json({ data: createRefillData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRefill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RefillId: string = req.params.id;
      const RefillData: CreateRefillDTO = req.body;
      const updateRefillData: IRefill = await this.RefillService.updateRefill(RefillId, RefillData);

      res.status(200).json({ data: updateRefillData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRefill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RefillId: string = req.params.id;
      const deleteRefillData: IRefill = await this.RefillService.deleteRefill(RefillId);

      res.status(200).json({ data: deleteRefillData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RefillController;
