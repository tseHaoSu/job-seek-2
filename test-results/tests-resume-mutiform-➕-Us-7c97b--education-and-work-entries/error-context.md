# Test info

- Name: ➕ User can add multiple education and work entries
- Location: C:\Users\yesta\Monash\FIT5120\job-seek-2\tests\resume-mutiform.spec.ts:3:5

# Error details

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Full Name')

    at C:\Users\yesta\Monash\FIT5120\job-seek-2\tests\resume-mutiform.spec.ts:8:44
```

# Page snapshot

```yaml
- heading "Password Protected" [level=1]
- textbox "Enter password"
- button "Submit"
- region "Notifications (F8)":
  - list
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('➕ User can add multiple education and work entries', async ({ page }) => {
   4 |   // ✅ 请确认这个是你能打开 resume 表单页面的完整地址
   5 |   await page.goto('http://localhost:3000/career-support/resume-support');
   6 |
   7 |   // ✅ 填写基本信息
>  8 |   await page.getByPlaceholder('Full Name').fill('John Smith');
     |                                            ^ Error: locator.fill: Test timeout of 30000ms exceeded.
   9 |
  10 |   // ✅ 添加并填写第 1 个教育经历
  11 |   await page.getByText('Add Education').click();
  12 |   await page.getByPlaceholder('Institution').nth(0).fill('MIT');
  13 |   await page.getByPlaceholder('Degree Type').nth(0).fill("Bachelor");
  14 |   await page.getByPlaceholder('Degree Name').nth(0).fill('Computer Science');
  15 |   await page.getByPlaceholder('Start Year').nth(0).fill('2010');
  16 |   await page.getByPlaceholder('End Year').nth(0).fill('2014');
  17 |
  18 |   // ✅ 添加并填写第 2 个教育经历
  19 |   await page.getByText('Add Education').click();
  20 |   await page.getByPlaceholder('Institution').nth(1).fill('Stanford');
  21 |   await page.getByPlaceholder('Degree Type').nth(1).fill("Master");
  22 |   await page.getByPlaceholder('Degree Name').nth(1).fill('AI');
  23 |   await page.getByPlaceholder('Start Year').nth(1).fill('2015');
  24 |   await page.getByPlaceholder('End Year').nth(1).fill('2017');
  25 |
  26 |   // ✅ 添加并填写第 1 个工作经历
  27 |   await page.getByText('Add Work Experience').click();
  28 |   await page.getByPlaceholder('Company').nth(0).fill('Google');
  29 |   await page.getByPlaceholder('Position').nth(0).fill('Software Engineer');
  30 |   await page.getByPlaceholder('Start Year').nth(0).fill('2017');
  31 |   await page.getByPlaceholder('End Year').nth(0).fill('2020');
  32 |
  33 |   // ✅ 添加并填写第 2 个工作经历
  34 |   await page.getByText('Add Work Experience').click();
  35 |   await page.getByPlaceholder('Company').nth(1).fill('OpenAI');
  36 |   await page.getByPlaceholder('Position').nth(1).fill('AI Researcher');
  37 |   await page.getByPlaceholder('Start Year').nth(1).fill('2021');
  38 |   await page.getByPlaceholder('End Year').nth(1).fill('2024');
  39 |
  40 |   // ✅ 提交简历表单
  41 |   await page.getByRole('button', { name: /Generate Resume/i }).click();
  42 |
  43 |   // ✅ 等待生成动画消失
  44 |   await page.waitForSelector('text=AI is generating your resume', {
  45 |     state: 'detached',
  46 |     timeout: 40000,
  47 |   });
  48 |
  49 |   // ✅ 等待生成结果展示
  50 |   await page.waitForSelector('text=Generated Resume Guidance', {
  51 |     timeout: 40000,
  52 |   });
  53 |
  54 |   // ✅ 校验生成结果是否包含填写内容
  55 |   const content = await page.locator('body').innerText();
  56 |   expect(content).toContain('MIT');
  57 |   expect(content).toContain('Stanford');
  58 |   expect(content).toContain('Google');
  59 |   expect(content).toContain('OpenAI');
  60 | });
  61 |
```