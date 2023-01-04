import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'body-parser';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import { fastifyHelmet } from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
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
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.NODE_ENV === undefined
  ) {
    const configAPI = new DocumentBuilder()
      .setTitle('Nidguay API')
      .setDescription('Nidguay API description')
      .setVersion('1.0')
      .addTag('Nidguay')
      .build();

    const document = SwaggerModule.createDocument(app, configAPI);
    SwaggerModule.setup('document', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
  } else {
    app.setGlobalPrefix('api/v1');
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });

  await app.listen(port, '0.0.0.0');
}
bootstrap();
