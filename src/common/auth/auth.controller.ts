import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req, @Res() res) {
    const token = await this.authService.validateOAuthLogin(req.user);
    // if (token) {
    //   res.redirect('http://localhost:4000/login/succes/' + token);
    // } else res.redirect('http://localhost:4000/login/failure');
    return res.status(HttpStatus.OK).json({
      message: 'Yeahh!!',
      token,
    });
  }
}
