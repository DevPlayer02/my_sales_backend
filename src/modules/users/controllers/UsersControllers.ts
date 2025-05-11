import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";
import { instanceToInstance } from "class-transformer";

export default class UsersControllers {
  public async index(_: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return res.json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(instanceToInstance(user));
  }
}