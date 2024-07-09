import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Deve ser possivel criar uma conta", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const result = await axios.post("http://localhost:3000/signup", input);
  expect(result.data).toEqual({
    accountId: expect.any(String),
  });
});

test("Deve ser possivel obter todos os dados de uma conta já criada", async () => {
  const input = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const resultSignup = await axios.post("http://localhost:3000/signup", input);
  const resultGetAccount = await axios.get(
    `http://localhost:3000/accounts/${resultSignup.data.accountId}`
  );
  expect(resultGetAccount.data).toEqual({
    accountId: expect.any(String),
    name: input.name,
    email: input.email,
    cpf: input.cpf,
    password: input.password,
    carPlate: null,
    isPassenger: input.isPassenger,
    isDriver: false,
  });
});
