import { Signup } from "./Signup";
import { AccountDAODatabase } from "../infra/dao/AccountDAODatabase";
import { RideDAODatabase } from "../infra/dao/RideDAODatabase";
import { GetRide } from "./GetRide";
import { RequestRide } from "./RequestRide";

test("Deve ser possivel obter todos os dados de uma corrida através do seu rideId", async () => {
  const accountDAO = new AccountDAODatabase();
  const rideDAO = new RideDAODatabase();
  const signup = new Signup(accountDAO);
  const requestRide = new RequestRide(rideDAO, accountDAO);
  const sut = new GetRide(rideDAO);
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
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();
  const outputGetRide = await sut.execute({
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
