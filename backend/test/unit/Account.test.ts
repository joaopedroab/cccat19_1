import Account from "../../src/domain/Account";

test("Deve criar uma conta de passageiro", function () {
    const account = Account.create("John Doe", "johndoe@gmail.com", "97456321558", "", "1234567", true, false);
    expect(account.name).toBe("John Doe")
    expect(account.email).toBe("johndoe@gmail.com")
})

test("Não deve criar uma conta de passageiro com nome inválido", function () {
    expect(() => Account.create("John", "johndoe@gmail.com", "97456321558", "", "1234567", true, false)).toThrow(new Error("Invalid name"))
})

test("Não deve criar uma conta de passageiro com email inválido", function () {
    expect(() => Account.create("John Doe", "johnd", "97456321558", "", "1234567", true, false)).toThrow(new Error("Invalid email"))
})

test("Não deve criar uma conta de passageiro com cpf inválido", function () {
    expect(() => Account.create("John Doe", "johndoe@gmail.com", "3423412", "", "1234567", true, false)).toThrow(new Error("Invalid cpf"))
})

test("Não deve criar uma conta de passageiro com placa do carro inválido", function () {
    expect(() => Account.create("John Doe", "johndoe@gmail.com", "97456321558", "AAA", "1234567", false, true)).toThrow(new Error("Invalid car plate"))
})