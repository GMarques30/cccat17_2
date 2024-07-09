import { AccountDAODatabase } from "../infra/dao/AccountDAODatabase";
import { AccountDAO } from "./DAO/AccountDAO";
import { Signup } from "./Signup";

let accountDAO: AccountDAO;
let sut: Signup;

beforeEach(() => {
  accountDAO = new AccountDAODatabase();
  sut = new Signup(accountDAO);
});

test("Deve ser possivel criar uma conta de passageiro", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const output = await sut.execute(input);
  expect(output.accountId).toBeDefined();
});

test("Deve ser possivel criar uma conta de motorista", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    carPlate: "AAA9999",
    isDriver: true,
  };
  const output = await sut.execute(input);
  expect(output.accountId).toBeDefined();
});

test("Não deve ser possivel criar uma conta que já exista", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  await sut.execute(input);
  expect(async () => await sut.execute(input)).rejects.toThrow(
    new Error("Account already exists")
  );
});

test("Não deve ser possivel criar uma conta com o nome invalido", async () => {
  const input = {
    name: "",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  expect(async () => await sut.execute(input)).rejects.toThrow(
    new Error("Invalid name")
  );
});

test("Não deve ser possivel criar uma conta com o email invalido", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  expect(async () => await sut.execute(input)).rejects.toThrow(
    new Error("Invalid email")
  );
});

test("Não deve ser possivel criar uma conta com o cpf invalido", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "11111111111",
    password: "123456",
    isPassenger: true,
  };
  expect(async () => await sut.execute(input)).rejects.toThrow(
    new Error("Invalid cpf")
  );
});

test("Não deve ser possivel criar uma conta com o a placa do carro invalida", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    carPlate: "AA99",
    isDriver: true,
  };
  expect(async () => await sut.execute(input)).rejects.toThrow(
    new Error("Invalid car plate")
  );
});
