export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  avater: string;
  phone: string;
  isActivated: string;
  userType: string;
  isAdmin: string;
  resetToken: string;
  otp?: string;
  addresses: [];
}
export interface UserEmail {
  email: string;
}
export interface PasswordResetComplete {
  email: string;
  password: string;
  verificationCode: string;
}
