import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class BulkAssignFlightDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  flightId: number;

  @ApiProperty({ example: [1, 2, 5, 7] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  userIds: number[];
}
