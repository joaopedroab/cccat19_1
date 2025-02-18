import axios from "axios";
import HttpClient, { AxiosAdapter } from "../http/HttpClient";

export default interface AccountGatway {
    signup (input: SignupInput): Promise<any>;
    getAccountById (accountId: string): Promise<GetAccountByIdOutput>;
}

export class AccountGatwayHttp implements AccountGatway {

	constructor (readonly httpClient: HttpClient) {

	}

    async signup(input: SignupInput): Promise<any> {
        return await this.httpClient.post("http://localhost:3000/signup", input);
    }

    async getAccountById(accountId: string): Promise<GetAccountByIdOutput> {
        return await this.httpClient.get(`http://localhost:3000/accounts/${accountId}`);
    }

}

type SignupInput = {
    name: string,
	email: string,
	cpf: string,
	password: string,
	carPlate?: string,
	isPassenger?: boolean,
	isDriver?: boolean
}

type GetAccountByIdOutput = {
    accountId: string,
	name: string,
	email: string,
	cpf: string,
	password: string,
	carPlate?: string,
	isPassenger?: boolean,
	isDriver?: boolean
}