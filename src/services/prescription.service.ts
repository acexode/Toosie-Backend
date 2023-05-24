/* eslint-disable prettier/prettier */
import { CreatePrescriptionDTO } from '@dtos/prescription.dto';
import { HttpException } from '@exceptions/HttpException';
import { IPrescription } from '@interfaces/prescription.interface';

import { isEmpty } from '@utils/util';
import PrescriptionModel from '@/models/prescription.model';

class PrescriptionService {
  public Prescriptions = PrescriptionModel;

  public async findAllPrescription(query): Promise<IPrescription[]> {
    const Prescriptions: IPrescription[] = await this.Prescriptions.find(query).populate('customerId');
    return Prescriptions;
  }

  public async findPrescriptionById(PrescriptionId: string): Promise<IPrescription> {
    if (isEmpty(PrescriptionId)) throw new HttpException(400, "You're not PrescriptionId");

    const findPrescription: IPrescription = await this.Prescriptions.findOne({ _id: PrescriptionId });
    if (!findPrescription) throw new HttpException(409, "You're not Prescription");

    return findPrescription;
  }

  public async createPrescription(PrescriptionData: CreatePrescriptionDTO): Promise<IPrescription> {
    if (isEmpty(PrescriptionData)) throw new HttpException(400, "You're not PrescriptionData");

    const findPrescription: IPrescription = await this.Prescriptions.findOne({ Prescription: PrescriptionData.description });
    if (findPrescription) throw new HttpException(409, `Prescription with this ${PrescriptionData.description} already exists`);

    const createPrescriptionData: IPrescription = await this.Prescriptions.create(PrescriptionData);

    return createPrescriptionData;
  }

  public async updatePrescription(PrescriptionId: string, PrescriptionData: CreatePrescriptionDTO): Promise<IPrescription> {
    if (isEmpty(PrescriptionData)) throw new HttpException(400, "You're not PrescriptionData");

    if (PrescriptionId) {
      const findPrescription: IPrescription = await this.Prescriptions.findOne({ _id: PrescriptionId });
      if (!findPrescription) throw new HttpException(409, `Prescription does not  exists`);
    }

    const updatePrescriptionById: IPrescription = await this.Prescriptions.findByIdAndUpdate(PrescriptionId, { PrescriptionData });
    if (!updatePrescriptionById) throw new HttpException(409, 'Failed to update Prescription');

    return updatePrescriptionById;
  }

  public async deletePrescription(PrescriptionId: string): Promise<IPrescription> {
    const deletePrescriptionById: IPrescription = await this.Prescriptions.findByIdAndDelete(PrescriptionId);
    if (!deletePrescriptionById) throw new HttpException(409, 'Failed to delete Prescription');

    return deletePrescriptionById;
  }
}

export default PrescriptionService;

