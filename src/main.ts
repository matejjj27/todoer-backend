import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://todoer-app-zeta.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(3000);
}
bootstrap();
