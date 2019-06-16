import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public getHello(): { [key: string]: any } {
    return { message: 'Welcome!' };
  }
}
