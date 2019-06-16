import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  private id: number = 1;
  private data: IUser[] = [];

  public getUserById(id: number): IUser | undefined {
    return this.data.find((user: IUser) => user.id === id);
  }

  public getUsers(): IUser[] {
    return this.data;
  }

  public addUser(data: CreateUserDto): IUser {
    const newUser: IUser = {
      ...data,
      id: this.id++,
      createdAt: new Date(),
      modifiedAt: null,
    };

    this.data.push(newUser);

    return newUser;
  }

  public modifyUser(userId: number, data: UpdateUserDto): void {
    const indexOfExistingUser: number = this.data.findIndex((user: IUser) => user.id === userId);

    if (indexOfExistingUser > -1) {
      this.data[indexOfExistingUser] = {
        ...this.data[indexOfExistingUser],
        ...data,
        modifiedAt: new Date(),
      };
    }
  }

  public removeUser(userId: number): void {
    this.data = this.data.filter((user: IUser) => user.id !== userId);
  }
}
