import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  try {
    const PORT = Number(process.env.PORT) ?? 3030;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    app.enableCors({
      origin: '*',
    });

    const config = new DocumentBuilder()
      .setTitle('Flight API')
      .setDescription('Users & Flights management')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost:${PORT}/api`);
      console.log(`Swagger: http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
