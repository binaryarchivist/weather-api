import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtPayload } from './guards/jwt.strategy';
import { GenerateTokenDto } from './dto/generate-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiOperation({ summary: 'Generate authentication token' })
  @ApiResponse({ status: 201, description: 'Token generated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    description: 'User credentials and optional permissions and role',
    type: GenerateTokenDto,
    examples: {
      a: {
        summary: 'Standard request',
        value: { username: 'user123', permissions: ['READ', 'WRITE']},
      },
    },
  })
  async getToken(
    @Body() body: GenerateTokenDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.generateToken(body);
    return { token };
  }
}
