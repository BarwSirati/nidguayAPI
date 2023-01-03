import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import compression from '@fastify/compress';

async function bootstrap() {
  const app: NestFastifyApplication = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
