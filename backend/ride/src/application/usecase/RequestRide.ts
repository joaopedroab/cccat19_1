import Ride from "../../domain/entity/Ride";
import AccountGatway from "../../infra/gateway/AccountGatway";
import RideRepository from "../../infra/repository/RideRepository";

export default class RequestRide {
	// DIP - Dependency Inversion Principle
	constructor (readonly accountGatway: AccountGatway, readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input) {
		const accountData = await this.accountGatway.getAccountById(input.passengerId);
		if (!accountData.isPassenger) throw new Error("Account must be from a passenger");
		const hasActiveRide = await this.rideRepository.hasActiveRideByPassengerId(input.passengerId);
		if (hasActiveRide) throw new Error("Passenger already have an active ride");
		const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);
		await this.rideRepository.saveRide(ride);
		return {
			rideId: ride.getRideId()
		}
	}
}

type Input = {
	passengerId: string,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number
}