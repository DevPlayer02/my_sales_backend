import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import ListUsersService from "@modules/users/services/ListUsersService";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from 'tsyringe';

export default class UsersControllers {
  public async index(_: Request, res: Response): Promise<void> {
    const listUsers = container.resolve(ListUsersService)

    const users = await listUsers.execute();

    res.json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    res.status(201).json(instanceToInstance(user));
  }
}