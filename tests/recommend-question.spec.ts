import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000/online-learning/recommend-question'
const PASSWORD = 'abcd0000'

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL)
  const passwordInput = page.locator('input[type="password"]')
  if (await passwordInput.isVisible()) {
    await passwordInput.fill(PASSWORD)
    await page.getByRole('button', { name: /submit|enter|unlock/i }).click()
    await page.waitForTimeout(1000)
    
  }
  await page.waitForSelector('text=How would you rate your overall comfort', { timeout: 10000 })
})

test.describe('Tool Recommendation Quiz', () => {
  test('✅ User can complete the quiz and see persona & recommended tools', async ({ page }) => {
    await page.getByText('Beginner', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Content Creation', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Workflow Integration', { exact: false }).click()
    await page.getByText('Finding the Right Tool', { exact: false }).click()
    await page.getByText('Collaboration Difficulties', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Skill Development', { exact: false }).click()
    await page.getByText('Organization', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Video Demonstrations', { exact: false }).click()
    await page.getByRole('button', { name: /See Results/i }).first().click()

    await expect(page.locator('text=You are:')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('text=Recommended Tools')).toBeVisible()
  })

  test('❌ Shows validation errors when no option is selected', async ({ page }) => {
    await page.getByRole('button', { name: /^Next$/ }).first().click()
    const error = page.locator('text=Selection Required').nth(0)
    await expect(error).toBeVisible({ timeout: 5000 })
  })

  test('🛑 Enforces exact limit in limitedMultiple question', async ({ page }) => {
    await page.getByText('Beginner', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Content Creation', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Workflow Integration', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Skill Development', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await expect(page.locator('text=Please select exactly')).toBeVisible({ timeout: 5000 })
  })

  test('🔁 Restart Assessment resets the quiz', async ({ page }) => {
    await page.getByText('Intermediate', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Content Creation', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Workflow Integration', { exact: false }).click()
    await page.getByText('Finding the Right Tool', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Skill Development', { exact: false }).click()
    await page.getByText('Organization', { exact: false }).click()
    await page.getByRole('button', { name: /^Next$/ }).first().click()

    await page.getByText('Video Demonstrations', { exact: false }).click()
    await page.getByRole('button', { name: /See Results/i }).first().click()

    await page.getByRole('button', { name: /Restart Assessment/ }).click()
    await expect(page.locator('text=How would you rate your overall comfort')).toBeVisible({ timeout: 10000 })
  })
})
