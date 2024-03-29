import { UpdateUserDto, OTPDTO, CreateUserAddressDto } from './../dtos/users.dto';
import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/referrals`, this.usersController.getReferrals);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.post(`${this.path}/createAddress`, validationMiddleware(CreateUserAddressDto, 'body'), this.usersController.createUserAddress);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.put(`${this.path}/activate?:id`, validationMiddleware(OTPDTO, 'body', true), this.usersController.verifyUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
