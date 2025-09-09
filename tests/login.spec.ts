import { test, expect } from '@playwright/test';

test.describe('Testes de Login' , ()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('http://localhost:8080/login.html');
    });
    test('Login com credencias validas', async ({page}) => {
        await page.fill('#username','marcio');
        await page.fill('#password','1234');
        await page.click('button');
        await expect(page).toHaveURL('http://localhost:8080/principal.html');
        await expect(page.locator('h1')).toContainText('Bem-vindo, Marcio!');
    });
    test('Login com credencias invalidas', async ({page}) => {
        await page.fill('#username','qualquercoisa');
        await page.fill('#password','qualquersenha');
        await page.click('button');
        page.on('dialog', async (dialog)=>{
            expect(dialog.message()).toContain('Credenciais inválidas');
            await dialog.dismiss();
        });
        await expect(page).toHaveURL('http://localhost:8080/login.html');
    });
    test('Login com senha vazia', async ({page}) => {
        await page.fill('#username','qualquercoisa');
        await page.click('button');
        page.on('dialog', async (dialog)=>{
            expect(dialog.message()).toContain('Credenciais inválidas');
            await dialog.dismiss();
        });
        await expect(page).toHaveURL('http://localhost:8080/login.html');
    });
});