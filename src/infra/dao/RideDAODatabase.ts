import pgp from "pg-promise";
import { RideDAO } from "../../application/DAO/RideDAO";

export class RideDAODatabase implements RideDAO {
  async saveRide(ride: any): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into cccat17.ride (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        ride.rideId,
        ride.passengerId,
        ride.driverId,
        ride.status,
        ride.fare,
        ride.distance,
        ride.fromLat,
        ride.fromLong,
        ride.toLat,
        ride.toLong,
        ride.date,
      ]
    );
    await connection.$pool.end();
  }

  async hasUnfinishedRides(passengerId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [ride] = await connection.query(
      "SELECT * FROM cccat17.ride WHERE passenger_id = $1 AND status != 'completed'",
      [passengerId]
    );
    await connection.$pool.end();
    return ride;
  }

  async getRideByRideId(rideId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [ride] = await connection.query(
      "select * from cccat17.ride where ride_id = $1",
      [rideId]
    );
    await connection.$pool.end();
    return ride;
  }
}
