import nodemailer from 'nodemailer';
import { MessageClient } from "cloudmailin"

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'toosiepharmacylimited@gmail.com',
    pass: 10052021,
  },
  logger: true,
});
class EmailService {
  public async verificationToken() {
    const mailOptions = {
      from: 'Toosiepharmacylimited@gmail.com',
      to: 'abudawud92@gmail.com',
      subject: 'Nice Nodemailer test',
      text: 'Hey there, it’s our first message sent with Nodemailer ',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
      attachments: [
        {
          filename: 'mailtrap.png',
          path: __dirname + '/mailtrap.png',
          cid: 'uniq-mailtrap.png',
        },
      ],
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}
export default EmailService;
