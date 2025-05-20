import AppError from '@shared/errors/AppError';
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories';
import { User } from '../infra/database/entities/User';
import SessionUserService from './SessionUserService';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-token'),
}));

const mockUserData: User[] = [
  {
    id: 1,
    name: 'John winchester',
    email: 'john@gmail.com',
    password: 'hashed-password',
    created_at: new Date(),
    updated_at: new Date(),
    avatar: 'avatar.jpg',
    getAvatarUrl() {
      return this.avatar;
    },
  },
];

let fakeUserRepositories: FakeUserRepositories;
let sessionUserService: SessionUserService;

describe('SessionUserService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories();
    sessionUserService = new SessionUserService(fakeUserRepositories);
  });

  it('should be able to authenticate with calid credentials', async () => {
    const user = { ...mockUserData[0] };
    const { email, password } = user;

    await fakeUserRepositories.create(user);

    (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(true);

    const response = await sessionUserService.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toBe(email);
  });

  it('should not be able to authenticate whit non-existing user', async () => {
    await expect(
      sessionUserService.execute({
        email: 'nonexisting@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = { ...mockUserData[0] };
    const { email } = user;

    await fakeUserRepositories.create(user);

    (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(false);

    await expect(
      sessionUserService.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
