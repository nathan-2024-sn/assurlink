import { Controller, Post, Param, Body, Headers } from '@nestjs/common';

@Controller('organizations/:orgId/quotes')
export class QuotesController {
  @Post()
  create(@Param('orgId') orgId: string, @Body() body: any, @Headers('Idempotency-Key') idempotencyKey: string) {
    // TODO: implement quote creation
    return { id: 'quote-uuid', status: 'draft', ...body };
  }
}
