export interface RideDAO {
  saveRide(ride: any): Promise<void>;
  hasUnfinishedRides(passengerId: string): Promise<any>;
  getRideByRideId(rideId: string): Promise<any>;
}
