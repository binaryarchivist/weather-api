import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async getToken(
    @Body() body: { username: string; permissions?: string[]; role?: string },
  ): Promise<{ token: string }> {
    const token = await this.authService.generateToken(body);
    return { token };
  }
}
