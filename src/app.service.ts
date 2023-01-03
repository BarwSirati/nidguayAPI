import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException(
      'THIS IS NIDGUAY API FOR CE-KMITL STUDENT',
      HttpStatus.OK,
    );
  }
}
