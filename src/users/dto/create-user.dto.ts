import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "User's full name",
    example: 'Ali Valiyev',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "User's age",
    example: 25,
    minimum: 1,
    maximum: 110,
  })
  @IsInt()
  @Min(1)
  @Max(110)
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: "User's country",
    example: 'Uzbekistan',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'ID of the flight the user belongs to',
    example: 3,
  })
  @ApiPropertyOptional({ example: 3, description: 'Optional flight ID' })
  @IsInt()
  @IsOptional() 
  flightId?: number;
}
