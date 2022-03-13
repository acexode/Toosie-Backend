/* eslint-disable prettier/prettier */
import { Router } from 'express';
import PrescriptionController from '@controllers/prescription.controller';
import { CreatePrescriptionDTO } from '@dtos/prescription.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class PrescriptionRoute implements Routes {
  public path = '/prescription';
  public router = Router();
  public PrescriptionController = new PrescriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.PrescriptionController.getPrescriptions);
    this.router.get(`${this.path}/:id`, this.PrescriptionController.getPrescriptionById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePrescriptionDTO, 'body'), this.PrescriptionController.createPrescription);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePrescriptionDTO, 'body', true), this.PrescriptionController.updatePrescription);
    this.router.delete(`${this.path}/:id`, this.PrescriptionController.deletePrescription);
  }
}

export default PrescriptionRoute;
