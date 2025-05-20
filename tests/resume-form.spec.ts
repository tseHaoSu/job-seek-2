import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000/career-support/resume-support'
const PASSWORD = 'abcd0000'

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL)
  const passwordInput = page.locator('input[type="password"]')
  if (await passwordInput.isVisible()) {
    await passwordInput.fill(PASSWORD)
    await page.getByRole('button', { name: /submit|enter|unlock/i }).click()
    await page.waitForTimeout(1000)
  }
})

test.describe('Resume Form', () => {
  test('User can fill out resume form and generate resume', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Jane Doe')
    await page.getByLabel('Institution').first().fill('Monash University')
    await page.getByLabel('Degree Type').first().fill("Bachelor's")
    await page.getByLabel('Degree Name').first().fill('Computer Science')
    await page.getByLabel('Start Year', { exact: true }).nth(0).fill('2020')
    await page.getByLabel('End Year', { exact: true }).nth(0).fill('2024')

    await page.getByLabel('Organization').first().fill('TechCorp')
    await page.getByLabel('Job Title').first().fill('Intern')
    await page.getByLabel('Start Year', { exact: true }).nth(1).fill('2024')
    await page.getByLabel('End Year', { exact: true }).nth(1).fill('2025')

    await page.getByRole('button', { name: 'Submit Resume' }).click()

    await page.waitForSelector('text=AI is generating your resume', { state: 'detached', timeout: 40000 })
    await page.locator('text=Resume submitted successfully!').waitFor({ timeout: 40000 })
    await expect(page.locator('text=Name: Jane Doe')).toBeVisible()

    let count
    count = await page.locator('text=Monash University').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Computer Science').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=TechCorp').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Intern').count()
    expect(count).toBeGreaterThan(0)

    await expect(page.getByRole('button', { name: /download pdf/i })).toBeVisible()
  })

  test('Shows validation errors when fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit Resume' }).click()

    let count
    count = await page.locator('text=Name is required').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Institution is required').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Degree type is required').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Degree name is required').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Organization is required').count()
    expect(count).toBeGreaterThan(0)
    count = await page.locator('text=Job title is required').count()
    expect(count).toBeGreaterThan(0)
  })

  test('Blocks years outside 1900-2100 range', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Jane Doe')
    await page.getByLabel('Institution').first().fill('Fake Uni')
    await page.getByLabel('Degree Type').first().fill('Bachelor')
    await page.getByLabel('Degree Name').first().fill('Nothing')
    await page.getByLabel('Start Year', { exact: true }).nth(0).fill('1800')
    await page.getByLabel('End Year', { exact: true }).nth(0).fill('1801')

    await page.getByLabel('Organization').first().fill('NoCorp')
    await page.getByLabel('Job Title').first().fill('Nothing')
    await page.getByLabel('Start Year', { exact: true }).nth(1).fill('2200')
    await page.getByLabel('End Year', { exact: true }).nth(1).fill('2500')

    await page.getByRole('button', { name: 'Submit Resume' }).click()

    await expect(page.locator('text=Invalid year')).toHaveCount(4)
  })

})