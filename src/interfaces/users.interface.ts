export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  isActivated: string;
  userType: string;
  isAdmin: string;
  resetToken: string;
}
export interface UserEmail {
  email: string;
}
