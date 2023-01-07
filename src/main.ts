import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['http://localhost:3000'];

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

    SwaggerModule.setup('document', app, document);

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
  } else {
    app.setGlobalPrefix('api/v1');
  }
  app.use(compression());
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));
  await app.listen(port);
}
bootstrap();
