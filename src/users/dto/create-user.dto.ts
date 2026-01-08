import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @Max(110)
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsInt()
  flightId: number;
}
