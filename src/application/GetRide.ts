import { RideDAO } from "./DAO/RideDAO";

export class GetRide {
  constructor(readonly rideDAO: RideDAO) {}

  async execute({ rideId }: Input): Promise<Output> {
    const ride = await this.rideDAO.getRideByRideId(rideId);
    return {
      rideId: ride.ride_id,
      passengerId: ride.passenger_id,
      driverId: ride.driver_id,
      status: ride.status,
      fare: parseFloat(ride.fare),
      distance: parseFloat(ride.distance),
      fromLat: parseFloat(ride.from_lat),
      fromLong: parseFloat(ride.from_long),
      toLat: parseFloat(ride.to_lat),
      toLong: parseFloat(ride.to_long),
      date: ride.date,
    };
  }
}

interface Input {
  rideId: string;
}

interface Output {
  rideId: string;
  passengerId: string;
  driverId: string;
  status: string;
  fare: number;
  distance: number;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
  date: Date;
}
