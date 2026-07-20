import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { QuotesController } from './controllers/quotes.controller';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [],
  controllers: [AuthController, QuotesController, HealthController],
  providers: [],
})
export class AppModule {}
