/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePrescriptionDTO } from '@dtos/prescription.dto';
import { IPrescription } from '@interfaces/prescription.interface';
import PrescriptionService from '@services/prescription.service';

class PrescriptionController {
  public PrescriptionService = new PrescriptionService();

  public getPrescriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPrescriptionsData: IPrescription[] = await this.PrescriptionService.findAllPrescription();

      res.status(200).json({ data: findAllPrescriptionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPrescriptionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PrescriptionId: string = req.params.id;
      const findOnePrescriptionData: IPrescription = await this.PrescriptionService.findPrescriptionById(PrescriptionId);

      res.status(200).json({ data: findOnePrescriptionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPrescription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PrescriptionData: CreatePrescriptionDTO = req.body;
      const createPrescriptionData: IPrescription = await this.PrescriptionService.createPrescription(PrescriptionData);

      res.status(201).json({ data: createPrescriptionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePrescription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PrescriptionId: string = req.params.id;
      const PrescriptionData: CreatePrescriptionDTO = req.body;
      const updatePrescriptionData: IPrescription = await this.PrescriptionService.updatePrescription(PrescriptionId, PrescriptionData);

      res.status(200).json({ data: updatePrescriptionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePrescription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PrescriptionId: string = req.params.id;
      const deletePrescriptionData: IPrescription = await this.PrescriptionService.deletePrescription(PrescriptionId);

      res.status(200).json({ data: deletePrescriptionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PrescriptionController;
