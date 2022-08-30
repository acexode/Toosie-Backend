import { sendEmail } from './../utils/email';
import { generateOTP } from './../utils/util';
import { ChangePasswordDto } from './../dtos/users.dto';
import { UserEmail, PasswordResetComplete } from './../interfaces/users.interface';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const otp = generateOTP();
    const msg = {
      to: userData.email, // Change to your recipient
      from: process.env.Email, // Change to your verified sender
      subject: 'TOOSIE OTP VERIFICATION',
      text: 'Your One Time Password (OTP) for Toosie app is ' + otp,
      html: `Your One Time Password (OTP) for Toosie app is<strong>${otp}</strong>`,
    };
    sendEmail(msg);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword, otp });

    return createUserData;
  }
  public async resendOTP(userData: UserEmail): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} doesnt exist exists`);

    const otp = generateOTP();
    const msg = {
      to: userData.email, // Change to your recipient
      from: process.env.Email, // Change to your verified sender
      subject: 'TOOSIE OTP VERIFICATION',
      text: 'Your One Time Password (OTP) for Toosie app is ' + otp,
      html: `Your One Time Password (OTP) for Toosie app is<strong>${otp}</strong>`,
    };
    sendEmail(msg);
    const updateUserById: User = await this.users.findByIdAndUpdate(findUser._id, { $set: { otp: otp } }, { new: true });
    if (!updateUserById) throw new HttpException(409, "You're not user");
    return updateUserById;
  }

  public async login(userData: LoginDto): Promise<{ token: any; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);

    return { token: tokenData, findUser };
  }
  public async changePassword(userData: ChangePasswordDto): Promise<{ token: any; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData cant be empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `Your email ${userData.email} is not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Your password not matching');

    const hashedPassword = await bcrypt.hash(userData.newPassword, 10);
    const updatedUser: User = await this.users.findOneAndUpdate({ email: userData.email }, { $set: { password: hashedPassword } }, { new: true });
    const tokenData = this.createToken(updatedUser);

    return { token: tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
  public async requestPasswordReset(userData: UserEmail) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    const otp = generateOTP();
    const msg = {
      to: userData.email, // Change to your recipient
      from: process.env.Email, // Change to your verified sender
      subject: 'TOOSIE PASSWORD RESET',
      html: `Use this reset code to change your password <strong>${otp}</strong>`,
    };
    sendEmail(msg);
  }
  public async passwordResetComplete(userData: PasswordResetComplete) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserById: User = await this.users.findByIdAndUpdate(findUser._id, { $set: { password: hashedPassword } }, { new: true });
    if (!updateUserById) throw new HttpException(409, 'Failed to reset password');
    return updateUserById;
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
