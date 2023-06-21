import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private MailerService: MailerService) {}

  async SendResetPasswordMail(email: string, data: any) {
    try {
      this.MailerService.sendMail({
        from: 't67206475@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>Click the following link to reset your password:</p><a href="http://localhost:8080/auth/reset_password?token=${data.token}">Reset Password</a>`,
      })
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          console.log(err);
          console.error('Error sending password reset email:', err);
        });
    } catch (error) {
      return { error: error.message, response: null };
    }
  }
}
