import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: join(__dirname, '..', 'views/layouts'),
    partialsDir: join(__dirname, '..', 'views/partials'),
  });
  app.engine('hbs', hbs.engine);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
