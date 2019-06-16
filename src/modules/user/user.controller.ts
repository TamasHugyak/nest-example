import {
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Put,
  Param,
  ParseIntPipe,
  NotFoundException,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { UserPayload } from './user.payload';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public listUsers(): UserPayload[] {
    const users: IUser[] = this.userService.getUsers();

    return plainToClass(UserPayload, users);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public addUser(
    @Body() data: CreateUserDto,
  ): UserPayload {
    const newUser: IUser = this.userService.addUser(data);

    return plainToClass(UserPayload, newUser);
  }

  @Put(':userId([1-9][0-9]{0,})')
  @HttpCode(HttpStatus.NO_CONTENT)
  public modifyUser(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() data: UpdateUserDto,
  ): void {
    const existingUser: IUser | undefined = this.userService.getUserById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with id #${userId} not found.`);
    }

    this.userService.modifyUser(userId, data);
  }

  @Delete(':userId([1-9][0-9]{0,})')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeUser(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): void {
    const existingUser: IUser | undefined = this.userService.getUserById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with id #${userId} not found.`);
    }

    this.userService.removeUser(userId);
  }
}
