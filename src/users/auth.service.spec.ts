/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  const fakeUsersService: Partial<UsersService> = {
    find: jest.fn().mockImplementation(() => Promise.resolve([])),
    create: jest
      .fn()
      .mockImplementation((email: string, password: string) =>
        Promise.resolve({ _id: 1, email, password }),
      ),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
