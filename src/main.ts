import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from '@fastify/helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { json, urlencoded } from 'body-parser';
import compression from '@fastify/compress';

async function bootstrap() {
  const app: NestFastifyApplication = await NestFactory.create(
    AppModule,
    new FastifyAdapter(),
  );
  const whitelist = ['http://localhost'];

  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Sorry, you are not allowed to join the party!'));
      }
    },
    optionsSuccessStatus: 200,
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  });

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const configAPI = new DocumentBuilder()
    .setTitle('Nidguay API')
    .setDescription('Nidguay API description')
    .setVersion('1.0')
    .addTag('Nidguay')
    .build();

  const document = SwaggerModule.createDocument(app, configAPI);
  SwaggerModule.setup('document', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(port);
}
bootstrap();
