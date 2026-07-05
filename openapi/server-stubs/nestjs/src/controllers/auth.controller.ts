import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    // TODO: implement login logic using Auth0
    return { mfa_required: false };
  }
}
