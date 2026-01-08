import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const PORT = Number(process.env.PORT) ?? 3030;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix('api');
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
