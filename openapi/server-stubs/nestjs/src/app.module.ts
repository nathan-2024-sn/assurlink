import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { QuotesController } from './controllers/quotes.controller';

@Module({
  imports: [],
  controllers: [AuthController, QuotesController],
  providers: [],
})
export class AppModule {}
