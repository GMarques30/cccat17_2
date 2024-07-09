import { AccountDAODatabase } from "../infra/dao/AccountDAODatabase";
import { RideDAODatabase } from "../infra/dao/RideDAODatabase";
import { RequestRide } from "./RequestRide";
import { Signup } from "./Signup";
import { AccountDAO } from "./DAO/AccountDAO";
import { RideDAO } from "./DAO/RideDAO";
import { GetRide } from "./GetRide";

let accountDAO: AccountDAO;
let rideDAO: RideDAO;
let signup: Signup;
let getRide: GetRide;
let sut: RequestRide;

beforeEach(() => {
  accountDAO = new AccountDAODatabase();
  rideDAO = new RideDAODatabase();
  signup = new Signup(accountDAO);
  getRide = new GetRide(rideDAO);
  sut = new RequestRide(rideDAO, accountDAO);
});

test("Deve ser possivel solicitar uma corrida", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const outputSignup = await signup.execute(inputSignup);
  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: 0,
    fromLong: 0,
    toLat: 0,
    toLong: 0,
  };
  const outputRequestRide = await sut.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();
  const outputGetRide = await getRide.execute({
    rideId: outputRequestRide.rideId,
  });
  expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);
  expect(outputGetRide.passengerId).toBe(inputRequestRide.passengerId);
  expect(outputGetRide.driverId).toBe(null);
  expect(outputGetRide.status).toBe("requested");
  expect(outputGetRide.fare).toBe(0);
  expect(outputGetRide.distance).toBe(0);
  expect(outputGetRide.fromLat).toBe(inputRequestRide.fromLat);
  expect(outputGetRide.fromLong).toBe(inputRequestRide.fromLong);
  expect(outputGetRide.toLat).toBe(inputRequestRide.toLat);
  expect(outputGetRide.toLong).toBe(inputRequestRide.toLong);
  expect(outputGetRide.date).toEqual(expect.any(Date));
});

test("Não deve ser possivel solicitar uma corrida pois já existe uma não finalizada", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    isPassenger: true,
  };
  const outputSignup = await signup.execute(inputSignup);
  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: 0,
    fromLong: 0,
    toLat: 0,
    toLong: 0,
  };
  await sut.execute(inputRequestRide);
  expect(async () => await sut.execute(inputRequestRide)).rejects.toThrow(
    new Error("Ride not finished")
  );
});

test("Não deve ser possivel solicitar uma corrida se o passengerId não pertence a um passageiro", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `johndoe${Math.random()}@example.com`,
    cpf: "97456321558",
    password: "123456",
    carPlate: "AAA9999",
    isDriver: true,
  };
  const outputSignup = await signup.execute(inputSignup);
  const inputRequestRide = {
    passengerId: outputSignup.accountId,
    fromLat: 0,
    fromLong: 0,
    toLat: 0,
    toLong: 0,
  };
  expect(async () => await sut.execute(inputRequestRide)).rejects.toThrow(
    new Error("This account does not belong to a passenger")
  );
});
