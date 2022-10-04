import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ErrorResponse } from '../utils/response'
import { AuthService } from './auth.service'
import { AuthDTO } from './dto/auth.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async auth(@Body() body: AuthDTO) {
    try {
      return this.authService.validateUser(body)
    } catch (error) {
      return new ErrorResponse(false, error.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
