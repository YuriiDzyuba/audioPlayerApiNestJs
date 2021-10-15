import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = 5001;

    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(PORT, () => console.log(`server has been started on port ${PORT}`));
}
bootstrap();
