import { datatype } from 'faker';
import User from '../models/User';

const TIMER = 3000;
const PAGE_SIZE = 5;

let users: User[] = [];

for (let i = 0; i < 15; i++) {
  users.push({
    id: i.toString(),
    name: `user_${i}`,
  });
}

export const getAllUsers = async (page: number): Promise<User[]> => {
  const result = users.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE,
  );
  console.log(`Call users: `, result);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(result);
      // rej('Error');
    }, TIMER);
  });
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(users.find((u) => u.id === id));
    }, TIMER);
  });
};

export const createUser = async (name: string): Promise<User> => {
  console.log(`Call create user: ${name}`);
  const newUser = { id: datatype.uuid(), name } as User;
  return new Promise((res) => {
    setTimeout(() => {
      users = [...users, newUser];
      res({ id: datatype.uuid(), name });
    }, TIMER);
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  console.log(`Call delete user: ${id}`);
  return new Promise<void>((res) => {
    setTimeout(() => {
      users = users.filter((user) => user.id !== id);
      res();
    }, TIMER);
  });
};
