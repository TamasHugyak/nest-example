import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { IUser } from './user.interface';

export class CreateUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  public age: number;
}

export class UpdateUserDto implements Partial<IUser> {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  public age: number;
}
