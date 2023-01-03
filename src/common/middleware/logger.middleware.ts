import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${req.method}\t${req.originalUrl}\t${res.statusCode}\t${req.ip}\n`;
    const filePath: string = path.resolve(`${__dirname}/../../logs`);
    try {
      if (!fs.existsSync(filePath)) {
        await fs.promises.mkdir(path.join(filePath));
      }

      await fs.promises.appendFile(path.join(filePath, 'reqLog.txt'), logItem);
    } catch (err) {
      console.log(err);
    }
    this.logger.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${req.ip}`,
    );
    next();
  }
}
