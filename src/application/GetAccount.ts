import { AccountDAO } from "./DAO/AccountDAO";

export class GetAccount {
  constructor(readonly accountDAO: AccountDAO) {}

  async execute({ accountId }: Input): Promise<Output> {
    const account = await this.accountDAO.getAccountByAccountId(accountId);
    return {
      accountId: account.account_id,
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      password: account.password,
      carPlate: account.car_plate,
      isPassenger: account.is_passenger,
      isDriver: account.is_driver,
    };
  }
}

interface Input {
  accountId: string;
}

interface Output {
  accountId: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
}
