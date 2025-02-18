import AccountGatway from "../../infra/gateway/AccountGatway";
import RideRepository from "../../infra/repository/RideRepository";

export default class AcceptRide {
	// DIP - Dependency Inversion Principle
	constructor (readonly accountGatway: AccountGatway, readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input) {
		const account = await this.accountGatway.getAccountById(input.driverId);
		if (!account.isDriver) throw new Error("Account must be from a driver");
		const hasActiveRide = await this.rideRepository.hasActiveRideByDriverId(input.driverId);
		if (hasActiveRide) throw new Error("Passenger already have an active ride");
		const ride = await this.rideRepository.getRideById(input.rideId);
		// mutation
		ride.accept(input.driverId);
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string,
	driverId: string
}