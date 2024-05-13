import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'user123'
  })
  username: string;

  @ApiProperty({
    description: 'List of permissions',
    example: ['read', 'write'],
    required: false,
    type: [String]
  })
  permissions?: string[];

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
    required: false
  })
  role?: string;
}
