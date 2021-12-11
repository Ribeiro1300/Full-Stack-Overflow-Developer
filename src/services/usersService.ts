import * as userRepository from "../repositories/usersRepository";
import { Token, User } from "../interfaces/interfaces";
import { v4 as uuid } from "uuid";

async function newUser(userinfo: User): Promise<Token> {
  const { name } = userinfo;
  const className = userinfo.class;
  const token = uuid();
  const result = await userRepository.newUser({ name: name, class: className, token: token });

  if (!result) return null;

  return { token };
}

export { newUser };
