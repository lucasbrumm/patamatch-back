import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'localhost'; // Pode ser 'localhost' ou '0.0.0.0'
  
  await app.listen(port, host);
  
  if (host === '0.0.0.0') {
    console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
    console.log(`📱 Access from other devices: http://192.168.0.245:${port}`);
    console.log(`💻 Local access: http://localhost:${port}`);
  } else {
    console.log(`🚀 Application is running on: http://${host}:${port}`);
    console.log(`💻 Local access only`);
  }
}
bootstrap();
