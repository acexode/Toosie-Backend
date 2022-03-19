/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from "class-validator";

export class CreatePrescriptionDTO {
    @IsString()
    public description: string;

    @IsString()
    @IsOptional()
    public prescriptionImage: string;

    @IsString()
    public customerId: string;
}
