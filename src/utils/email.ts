/* eslint-disable prettier/prettier */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = obj => {
  
  sgMail
    .send(obj)
    .then((val) => {
      console.log(val, 'Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};
