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
  address: object;
}
export interface UserEmail {
  email: string;
}
