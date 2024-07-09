export interface AccountDAO {
  getAccountByAccountId(accountId: string): Promise<any>;
  getAccountByEmail(email: string): Promise<any>;
  saveAccount(account: any): Promise<void>;
  accountBelongsToAPassenger(passengerId: string): Promise<any>;
}
