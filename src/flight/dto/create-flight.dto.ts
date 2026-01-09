import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlightDto {
  @ApiProperty({
    description: 'Unique flight number',
    example: 'HY123',
  })
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @ApiProperty({
    description: 'Flight departure time (ISO format)',
    example: '2026-01-10T14:30:00Z',
  })
  @IsDateString()
  departureTime: string;

  @ApiProperty({
    description: 'Flight arrival time (ISO format)',
    example: '2026-01-10T18:45:00Z',
  })
  @IsDateString()
  arrivalTime: string;

  @ApiProperty({
    description: 'Airline company name',
    example: 'Uzbekistan Airways',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;
}
