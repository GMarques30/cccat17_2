import pgp from "pg-promise";
import { AccountDAO } from "../../application/DAO/AccountDAO";

export class AccountDAODatabase implements AccountDAO {
  async getAccountByAccountId(accountId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [account] = await connection.query(
      "select * from cccat17.account where account_id = $1",
      [accountId]
    );
    await connection.$pool.end();
    return account;
  }

  async getAccountByEmail(email: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [account] = await connection.query(
      "select * from cccat17.account where email = $1",
      [email]
    );
    await connection.$pool.end();
    return account;
  }

  async saveAccount(account: any): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into cccat17.account (account_id, name, email, cpf, password, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        account.accountId,
        account.name,
        account.email,
        account.cpf,
        account.password,
        account.carPlate,
        !!account.isPassenger,
        !!account.isDriver,
      ]
    );
    await connection.$pool.end();
  }

  async accountBelongsToAPassenger(passengerId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [account] = await connection.query(
      "select * from cccat17.account where account_id = $1 AND is_passenger = 'true'",
      [passengerId]
    );
    await connection.$pool.end();
    return account;
  }
}
