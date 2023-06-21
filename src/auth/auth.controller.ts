import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  LoginAuthDto,
  RegisterAuthDto,
  ResetPasswordAuthDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './utils/auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/admin/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginAuthDto })
  AdminLogin(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.adminLOgin(loginAuthDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: RegisterAuthDto })
  UserRegister(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.userRegsiter(registerAuthDto);
  }

  @Post('/resetPassword_email')
  @ApiOperation({ summary: 'Reset Password' })
  @ApiBody({ type: ResetPasswordAuthDto })
  sendPasswordResetEmail(@Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
    return this.authService.sendPasswordResetEmail(resetPasswordAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
