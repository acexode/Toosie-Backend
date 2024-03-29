/* eslint-disable prettier/prettier */

import { CreateRefillDTO } from '@dtos/refill.dto';
import { HttpException } from '@exceptions/HttpException';
import { IRefill } from './../interfaces/refill';

import { isEmpty } from '@utils/util';
import RefillModel from '@/models/refill.model';

class RefillService {
  public RefillS = RefillModel;

  public async findAllRefill(query): Promise<IRefill[]> {
    const refill: IRefill[] = await this.RefillS.find(query).populate({
      path: 'orderId',
      populate: {
        path: 'products',
        model: 'Product'
      }
   })
    return refill;
  }

  public async findRefillById(refillId: string): Promise<IRefill> {
    if (isEmpty(refillId)) throw new HttpException(400, "You're not refillId");

    const findRefill: IRefill = await this.RefillS.findOne({ _id: refillId });
    if (!findRefill) throw new HttpException(409, "You're not Refill");

    return findRefill;
  }

  public async createRefill(RefillData: CreateRefillDTO): Promise<IRefill> {
    if (isEmpty(RefillData)) throw new HttpException(400, "You're not RefillData");

    const findRefill: IRefill = await this.RefillS.findOne({ Refill: RefillData.orderId, customerId: RefillData.customerId });
    if (findRefill) throw new HttpException(409, `Refill with this ${RefillData.orderId} already exists`);

    const today = new Date(RefillData.startDate);
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + parseInt(RefillData.frequency));
    const newObj = {
      ...RefillData,
      nextRefillDate: nextDate
    }
    const createRefillData: IRefill = await this.RefillS.create(newObj);

    return createRefillData;
  }

  public async updateRefill(refillId: string, RefillData: CreateRefillDTO): Promise<IRefill> {
    if (isEmpty(RefillData)) throw new HttpException(400, "You're not RefillData");

    if (refillId) {
      const findRefill: IRefill = await this.RefillS.findOne({ _id: refillId });
      if (!findRefill) throw new HttpException(409, `Refill does not  exists`);
    }

    const updateRefillById: IRefill = await this.RefillS.findByIdAndUpdate(refillId, { RefillData });
    if (!updateRefillById) throw new HttpException(409, 'Failed to update Refill');

    return updateRefillById;
  }

  public async deleteRefill(refillId: string): Promise<IRefill> {
    const deleteRefillById: IRefill = await this.RefillS.findByIdAndDelete(refillId);
    if (!deleteRefillById) throw new HttpException(409, 'Failed to delete Refill');

    return deleteRefillById;
  }
}

export default RefillService;
