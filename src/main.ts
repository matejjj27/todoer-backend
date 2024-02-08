import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://todoer-app-zeta.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  });
  await app.listen(3000);
}
bootstrap();
