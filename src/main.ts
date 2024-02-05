import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards(new RolesGuard());
  const config = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('CRUD for Products and User')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //document is serializable object conforming to OpenAPI Document.
  await app.listen(3000);
}
bootstrap();
