import { Exclude, Expose } from 'class-transformer';
import { IUser } from './user.interface';

@Exclude() // exclude each property except that have @Expose() decorator
export class UserPayload implements Partial<IUser> {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public age: number;
}
