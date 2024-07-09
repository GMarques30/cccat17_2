import crypto from "crypto";
import { RideDAO } from "./DAO/RideDAO";
import { AccountDAO } from "./DAO/AccountDAO";

export class RequestRide {
  constructor(readonly rideDAO: RideDAO, readonly accountDAO: AccountDAO) {}

  async execute({
    passengerId,
    fromLat,
    fromLong,
    toLat,
    toLong,
  }: Input): Promise<Output> {
    const isPassenger = await this.accountDAO.accountBelongsToAPassenger(
      passengerId
    );
    if (!isPassenger)
      throw new Error("This account does not belong to a passenger");
    const rideNotFinished = await this.rideDAO.hasUnfinishedRides(passengerId);
    if (rideNotFinished) throw new Error("Ride not finished");
    const ride = {
      rideId: crypto.randomUUID(),
      passengerId,
      driverId: null,
      status: "requested",
      fare: 0,
      distance: 0,
      fromLat,
      fromLong,
      toLat,
      toLong,
      date: new Date(),
    };
    await this.rideDAO.saveRide(ride);
    return {
      rideId: ride.rideId,
    };
  }
}

interface Input {
  passengerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
}

interface Output {
  rideId: string;
}
