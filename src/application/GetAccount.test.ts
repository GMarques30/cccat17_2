import { AccountDAODatabase } from "../infra/dao/AccountDAODatabase";
import { AccountDAO } from "./DAO/AccountDAO";
import { GetAccount } from "./GetAccount";
import { Signup } from "./Signup";

let accountDAO: AccountDAO;
let signup: Signup;
let sut: GetAccount;

beforeEach(() => {
  accountDAO = new AccountDAODatabase();
  signup = new Signup(accountDAO);
  sut = new GetAccount(accountDAO);
});

test("Deve ser possivel obter os dados de uma conta de passageiro", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const outputSignup = await signup.execute(inputSignup);
  const outputGetAccount = await sut.execute({
    accountId: outputSignup.accountId,
  });
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(inputSignup.name);
  expect(outputGetAccount.email).toBe(inputSignup.email);
  expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
  expect(outputGetAccount.password).toBe(inputSignup.password);
  expect(outputGetAccount.isPassenger).toBe(inputSignup.isPassenger);
});

test("Deve ser possivel obter os dados de uma conta de motorista", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    carPlate: "AAA9999",
    isDriver: true,
  };
  const outputSignup = await signup.execute(inputSignup);
  const outputGetAccount = await sut.execute(outputSignup);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(inputSignup.name);
  expect(outputGetAccount.email).toBe(inputSignup.email);
  expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
  expect(outputGetAccount.password).toBe(inputSignup.password);
  expect(outputGetAccount.carPlate).toBe(inputSignup.carPlate);
  expect(outputGetAccount.isDriver).toBe(inputSignup.isDriver);
});
