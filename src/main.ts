import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { networkInterfaces } from 'os';

function getLocalIpAddress(): string | null {
  const interfaces = networkInterfaces();

  for (const interfaceName of Object.keys(interfaces)) {
    const networkInterface = interfaces[interfaceName];
    if (!networkInterface) continue;

    for (const alias of networkInterface) {
      // Ignora interfaces loopback e IPv6
      if (alias.family === 'IPv4' && !alias.internal) {
        // Prioriza interfaces que começam com 'en' (Ethernet) ou 'wl' (WiFi)
        if (
          interfaceName.startsWith('en') ||
          interfaceName.startsWith('wl') ||
          interfaceName.startsWith('eth')
        ) {
          return alias.address;
        }
      }
    }
  }

  // Se não encontrou interface específica, retorna o primeiro IPv4 não loopback
  for (const interfaceName of Object.keys(interfaces)) {
    const networkInterface = interfaces[interfaceName];
    if (!networkInterface) continue;

    for (const alias of networkInterface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return null;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'localhost'; // Pode ser 'localhost' ou '0.0.0.0'

  await app.listen(port, host);

  if (host === '0.0.0.0') {
    const localIp = getLocalIpAddress();
    console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
    console.log(`💻 Local access: http://localhost:${port}`);

    if (localIp) {
      console.log(`📱 Access from other devices: http://${localIp}:${port}`);
    } else {
      console.log(
        `📱 Access from other devices: IP not detected automatically`,
      );
    }
  } else {
    console.log(`🚀 Application is running on: http://${host}:${port}`);
    console.log(`💻 Local access only`);
  }
}

bootstrap();
