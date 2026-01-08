import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;
}
