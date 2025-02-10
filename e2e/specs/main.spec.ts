import {test, expect, type Page} from '@playwright/test'

test.describe('Signup Test', () => {
    test("Deve criar uma conta de passageiro", async ({ page }) => {
        await page.goto("http://localhost:5173");
        await page.locator(".input-name").fill("John Doe");
        await page.locator(".input-email").fill(`john.doe${Math.random()}@gmail.com`);
        await page.locator(".input-cpf").fill("97456321558");
        await page.locator(".input-password").fill("123456");
        await page.locator(".input-is-passenger").check();
        await page.locator(".button-signup").click();
        await expect(page.locator(".span-status")).toHaveText("success");
    })
});

test.describe('Signup Test', () => {
    test("Não deve criar uma conta de passageiro com nome inválido", async ({ page }) => {
        await page.goto("http://localhost:5173");
        await page.locator(".input-name").fill("John");
        await page.locator(".input-email").fill(`john.doe${Math.random()}@gmail.com`);
        await page.locator(".input-cpf").fill("97456321558");
        await page.locator(".input-password").fill("123456");
        await page.locator(".input-is-passenger").check();
        await page.locator(".button-signup").click();
        await expect(page.locator(".span-status")).toHaveText("error");
        await expect(page.locator(".span-message")).toHaveText("Invalid name");
    })
})