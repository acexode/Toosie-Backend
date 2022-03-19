/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreatePrescriptionDTO {
    @IsString()
    public description: string;

    @IsString()
    public prescriptionImage: string;

    @IsString()
    public customerId: string;
}
