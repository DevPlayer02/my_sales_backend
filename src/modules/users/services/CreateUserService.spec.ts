import { userMock } from '../domain/factories/userFactory';
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories';
import CreateUserService from './CreateUserService';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

let fakeUserRepositories: FakeUserRepositories;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories();
    createUserService = new CreateUserService(fakeUserRepositories);
  });
  it('Should be able to create a new user', async () => {
    (hash as jest.Mock).mockReturnValue('hashed-password');

    const user = await createUserService.execute(userMock);
  });

  it('Should not be able to create a user with an existing email', async () => {
    await createUserService.execute(userMock);

    await expect(createUserService.execute(userMock)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should hash the password before saving the user', async () => {
    const hashSpy = jest
      .spyOn(require('bcrypt'), 'hash')
      .mockResolvedValue('hashed-password');

    await createUserService.execute(userMock);

    expect(hashSpy).toHaveBeenCalledWith('123456', 10);
  });
});
