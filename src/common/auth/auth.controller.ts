import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = await req.user.jwt;
    console.log(jwt);
    return {
      message: 'success',
      jwt,
    };
  }
}
