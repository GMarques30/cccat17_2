import crypto from "crypto";
import { validateCpf } from "../validateCpf";
import { AccountDAO } from "./DAO/AccountDAO";

export class Signup {
  constructor(readonly accountDAO: AccountDAO) {}

  async execute({
    name,
    email,
    cpf,
    password,
    carPlate,
    isPassenger,
    isDriver,
  }: Input): Promise<Output> {
    const accountAlreadyExists = await this.accountDAO.getAccountByEmail(email);
    if (accountAlreadyExists) throw new Error("Account already exists");
    if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
    if (!email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(cpf)) throw new Error("Invalid cpf");
    if (isDriver && carPlate && !carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    const account = {
      accountId: crypto.randomUUID(),
      name,
      email,
      cpf,
      password,
      carPlate,
      isPassenger,
      isDriver,
    };
    await this.accountDAO.saveAccount(account);
    return {
      accountId: account.accountId,
    };
  }
}

interface Input {
  name: string;
  email: string;
  cpf: string;
  password: string;
  carPlate?: string;
  isPassenger?: boolean;
  isDriver?: boolean;
}

interface Output {
  accountId: string;
}
