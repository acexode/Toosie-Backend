import AuthService from '@services/auth.service';
import { OTPDTO } from './../dtos/users.dto';
import { sendEmail } from './../utils/email';
import { generateOTP } from './../utils/util';
import bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { UserAddress } from '@/interfaces/user-address.interface';
import userAddressModel from '@/models/user-address.model';

class UserService {
  public users = userModel;
  public addresses = userAddressModel;
  public authS = new AuthService();

  async updateALLUser() {
    // console.log('upading -----');
    // const upd = await this.users.updateMany({}, { $set: { loyaltyPoint: 0 } });
    // console.log(upd);
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
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
      html: `<strong>${otp}</strong>`,
    };
    sendEmail(msg);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword, otp: otp });
    createUserData.otp = null;
    return createUserData;
  }
  public async createUserAddress(userData: UserAddress): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'No data is passed');
    console.log(userData);
    const findUser: User = await this.users.findOne({ email: userData.user });
    console.log(findUser, 'founded');
    if (!findUser) throw new HttpException(409, `User does not exist`);
    const address = {
      ...userData,
      user: findUser._id,
    };
    const createUserData: UserAddress = await this.addresses.create({ ...address });
    await this.users.findByIdAndUpdate(findUser._id, { $push: { addresses: createUserData } });
    const updatedUser: User = await this.users.findOne({ email: userData.user }).populate('addresses');
    console.log(updatedUser);
    return updatedUser;
  }

  public async verifyUser(userId: string, userData: OTPDTO): Promise<{ token: any; user: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });

    if (!findUser) throw new HttpException(409, `User not found`);
    console.log(userData, userId);
    if (parseInt(userData.otp) !== parseInt(findUser.otp)) {
      throw new HttpException(409, `Invalid OTP`);
    }

    const user: User = await this.users.findByIdAndUpdate(findUser._id, { $set: { isActivated: true } }, { new: true });
    // if (!updateUserById) throw new HttpException(409, "You're not user");
    console.log(user);
    const token = this.authS.createToken(findUser);
    return { user, token };
  }
  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    // if (userData.password) {
    //   const hashedPassword = await bcrypt.hash(userData.password, 10);
    //   userData = { ...userData, password: hashedPassword };
    // }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { $set: { ...userData } }, { new: true });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
