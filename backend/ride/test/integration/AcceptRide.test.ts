import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import { RideRepositoryDatabase } from "../../src/infra/repository/RideRepository";
import sinon from "sinon";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import { PositionRepositoryDatabase } from "../../src/infra/repository/PositionRepository";
import AccountGatway, { AccountGatwayHttp } from "../../src/infra/gateway/AccountGatway";
import { AxiosAdapter, FetchAdapter } from "../../src/infra/http/HttpClient";

let connection: DatabaseConnection;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let accountGatway: AccountGatway;

beforeEach(() => {
    // const accountRepository = new AccountRepositoryMemory();
    connection = new PgPromiseAdapter();
    // const httpClient = new AxiosAdapter();
    const httpClient = new FetchAdapter();
    accountGatway = new AccountGatwayHttp(httpClient);
    const rideRepository = new RideRepositoryDatabase(connection);
    const positionRepository = new PositionRepositoryDatabase(connection);
    requestRide = new RequestRide(accountGatway, rideRepository);
    getRide = new GetRide(accountGatway, rideRepository, positionRepository);
    acceptRide = new AcceptRide(accountGatway, rideRepository);
});

test("Deve aceitar uma corrida", async function () {
    const inputSignupPassenger = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    }
    const outputSignupPassenger = await accountGatway.signup(inputSignupPassenger);
    const inputSignupDriver = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        carPlate: "AAA9999",
        isDriver: true
    }
    const outputSignupDriver = await accountGatway.signup(inputSignupDriver);
    const inputRequestRide = {
        passengerId: outputSignupPassenger.accountId,
        fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
    }
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputSignupDriver.accountId
    }
    await acceptRide.execute(inputAcceptRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.status).toBe("accepted");
    expect(outputGetRide.driverId).toBe(outputSignupDriver.accountId);
});

afterEach(async () => {
    await connection.close();
});