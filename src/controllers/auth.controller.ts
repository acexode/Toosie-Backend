import { ChangePasswordDto, OTPDTO } from './../dtos/users.dto';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import UserService from '@/services/users.service';

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { token, findUser } = await this.authService.login(userData);

      res.status(200).json({ data: findUser, token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
  public verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: OTPDTO = req.body;
      const updateUserData: User = await this.userService.verifyUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'Account activated' });
    } catch (error) {
      next(error);
    }
  };
  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: ChangePasswordDto = req.body;
      const { token, findUser } = await this.authService.changePassword(userData);

      res.status(200).json({ data: findUser, token, message: 'password changed successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
