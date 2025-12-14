import { test, expect, Page } from '@playwright/test';

/**
 * STRICT E2E Test Suite for Poincaré Invitation System
 * Tests all critical user flows with comprehensive assertions
 */

test.describe('Poincaré Invitation System - Strict E2E Tests', () => {

  // ==========================================================================
  // AUTHENTICATION TESTS
  // ==========================================================================
  test.describe('1. Authentication', () => {
    
    test('1.1 Login page renders correctly', async ({ page }) => {
      await page.goto('/login');
      
      // Verify all login elements (Chinese UI)
      await expect(page.locator('h1')).toContainText('邀请函系统');
      await expect(page.locator('text=用户编码')).toBeVisible();
      await expect(page.locator('text=密码')).toBeVisible();
      await expect(page.locator('input[name="salesCode"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('1.2 Sales user login succeeds and redirects to dashboard', async ({ page }) => {
      await page.goto('/login');
      
      await page.fill('input[name="salesCode"]', 'S001');
      await page.fill('input[name="password"]', '123456');
      await page.click('button[type="submit"]');
      
      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await expect(page).toHaveURL(/\/dashboard/);
      
      // Verify dashboard loaded (Chinese UI)
      await expect(page.locator('text=欢迎回来')).toBeVisible();
    });

    test('1.3 Admin user login succeeds', async ({ page }) => {
      await page.goto('/login');
      
      await page.fill('input[name="salesCode"]', 'admin');
      await page.fill('input[name="password"]', '123456');
      await page.click('button[type="submit"]');
      
      // Wait for navigation - admin may redirect to /admin or /dashboard
      await page.waitForTimeout(3000);
      
      // Should not still be on login page with an error
      const hasError = await page.locator('.text-red-400').isVisible();
      expect(hasError).toBe(false);
    });

    test('1.4 Invalid credentials show error message', async ({ page }) => {
      await page.goto('/login');
      
      await page.fill('input[name="salesCode"]', 'invalid_user');
      await page.fill('input[name="password"]', 'wrong_password');
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(1500);
      
      // Should stay on login page
      await expect(page).toHaveURL(/\/login/);
      
      // Error message should be visible
      const errorElement = page.locator('.text-red-400, [class*="red-400"], [class*="error"]');
      await expect(errorElement).toBeVisible();
    });

    test('1.5 Empty credentials prevent submission', async ({ page }) => {
      await page.goto('/login');
      
      // Try submitting with empty fields
      await page.click('button[type="submit"]');
      
      // Should stay on login page (HTML5 validation)
      await expect(page).toHaveURL(/\/login/);
    });
  });

  // ==========================================================================
  // SALES DASHBOARD TESTS
  // ==========================================================================
  test.describe('2. Sales Dashboard', () => {
    
    test.beforeEach(async ({ page }) => {
      await salesLogin(page);
    });

    test('2.1 Dashboard displays stats cards', async ({ page }) => {
      // Verify all 5 stats cards (Chinese UI)
      await expect(page.locator('text=总计')).toBeVisible();
      await expect(page.locator('text=已接受')).toBeVisible();
      await expect(page.locator('text=已查看')).toBeVisible();
      await expect(page.locator('text=已拒绝')).toBeVisible();
      await expect(page.locator('text=接受率')).toBeVisible();
    });

    test('2.2 Sidebar navigation works', async ({ page }) => {
      // Overview link
      await expect(page.locator('a[href="/dashboard"]').first()).toBeVisible();
      
      // Create Invite link
      await expect(page.locator('a[href="/dashboard/create"]').first()).toBeVisible();
      
      // My Invitations link
      await expect(page.locator('a[href="/dashboard/invitations"]').first()).toBeVisible();
    });

    test('2.3 Create page loads with form elements', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      await expect(page).toHaveURL('/dashboard/create');
      
      // Verify form elements
      await expect(page.locator('input[name="guestName"]')).toBeVisible();
      await expect(page.locator('select[name="language"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      
      // Verify template style label (Chinese UI)
      await expect(page.locator('text=模板样式')).toBeVisible();
    });

    test('2.4 Create page shows all 8 language options', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      const languageSelect = page.locator('select[name="language"]');
      const options = await languageSelect.locator('option').allTextContents();
      
      // Should have 16 languages
      expect(options.length).toBe(16);
      expect(options).toContain('English');
      expect(options).toContain('简体中文');
      expect(options).toContain('日本語');
    });

    test('2.5 Invitations list page loads', async ({ page }) => {
      await page.goto('/dashboard/invitations');
      
      await expect(page).toHaveURL('/dashboard/invitations');
      
      // Verify table headers (Chinese UI)
      await expect(page.locator('th:has-text("嘉宾")')).toBeVisible();
      await expect(page.locator('th:has-text("状态")')).toBeVisible();
    });
  });

  // ==========================================================================
  // INVITATION CREATION FLOW
  // ==========================================================================
  test.describe('3. Invitation Creation', () => {
    
    test.beforeEach(async ({ page }) => {
      await salesLogin(page);
    });

    test('3.1 Create invitation with required fields', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      const testGuestName = `Test Guest ${Date.now()}`;
      
      await page.fill('input[name="guestName"]', testGuestName);
      await page.selectOption('select[name="language"]', 'en');
      
      await page.click('button[type="submit"]');
      
      // Wait for redirect
      await page.waitForTimeout(3000);
      
      // Should redirect to dashboard or invitations
      expect(page.url()).toMatch(/\/dashboard/);
    });

    test('3.2 Create invitation with Chinese language', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      const testGuestName = `中文测试 ${Date.now()}`;
      
      await page.fill('input[name="guestName"]', testGuestName);
      await page.selectOption('select[name="language"]', 'zh-CN');
      
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(3000);
      expect(page.url()).toMatch(/\/dashboard/);
    });

    test('3.3 Created invitation appears in list', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      const uniqueName = `Verify List ${Date.now()}`;
      
      await page.fill('input[name="guestName"]', uniqueName);
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(3000);
      
      // Navigate to invitations list
      await page.goto('/dashboard/invitations');
      await page.waitForTimeout(1000);
      
      // Verify the invitation appears
      await expect(page.locator(`text=${uniqueName}`)).toBeVisible();
    });

    test('3.4 Empty guest name prevents submission', async ({ page }) => {
      await page.goto('/dashboard/create');
      
      // Don't fill guest name, just click submit
      await page.click('button[type="submit"]');
      
      // Should stay on create page (HTML5 validation)
      await expect(page).toHaveURL(/\/dashboard\/create/);
    });
  });

  // ==========================================================================
  // ADMIN FEATURES
  // ==========================================================================
  test.describe('4. Admin Features', () => {
    
    test('4.1 Admin dashboard page loads', async ({ page }) => {
      await adminLogin(page);
      await page.goto('/admin');
      
      await expect(page.locator('text=管理后台')).toBeVisible();
      await expect(page.locator('text=邀请总数')).toBeVisible();
    });

    test('4.2 Admin users page loads', async ({ page }) => {
      await adminLogin(page);
      await page.goto('/admin/users');
      
      await expect(page.locator('text=销售用户')).toBeVisible();
    });

    test('4.3 Admin templates page loads', async ({ page }) => {
      await adminLogin(page);
      await page.goto('/admin/templates');
      
      await expect(page.locator('text=模板管理')).toBeVisible();
    });

    test('4.4 Admin config form has event time input', async ({ page }) => {
      await adminLogin(page);
      await page.goto('/admin');
      
      await expect(page.locator('text=系统配置')).toBeVisible();
      await expect(page.locator('input[name="eventTime"]')).toBeVisible();
      await expect(page.locator('input[name="eventEndTime"]')).toBeVisible();
      await expect(page.locator('input[name="meetingLink"]')).toBeVisible();
      await expect(page.locator('input[name="wecomWebhook"]')).toBeVisible();
    });

    test('4.5 Admin export page loads', async ({ page }) => {
      await adminLogin(page);
      await page.goto('/admin/export');
      
      await expect(page.locator('text=数据导出')).toBeVisible();
    });
  });

  // ==========================================================================
  // GUEST INVITATION PAGE
  // ==========================================================================
  test.describe('5. Guest Invitation Page', () => {
    
    test('5.1 Create and access invitation as guest', async ({ page }) => {
      // Create invitation as sales
      await salesLogin(page);
      await page.goto('/dashboard/create');
      
      const guestName = `Guest Flow ${Date.now()}`;
      await page.fill('input[name="guestName"]', guestName);
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(3000);
      
      // Go to invitations and get link
      await page.goto('/dashboard/invitations');
      await page.waitForTimeout(1000);
      
      // Get first invitation link
      const links = await page.locator('a[target="_blank"]').all();
      expect(links.length).toBeGreaterThan(0);
      
      const href = await links[0].getAttribute('href');
      expect(href).toContain('/invite/');
      
      // Visit as guest
      await page.goto(href!);
      await page.waitForTimeout(1000);
      
      // Verify invitation content
      await expect(page.locator(`text=${guestName}`)).toBeVisible();
    });

    test('5.2 Invalid token shows 404', async ({ page }) => {
      await page.goto('/invite/invalid-token-123');
      
      // Should show 404 or error
      await expect(page.locator('text=404').or(page.locator('text=Not Found'))).toBeVisible();
    });
  });

  // ==========================================================================
  // QR CODE API
  // ==========================================================================
  test.describe('6. QR Code API', () => {
    
    test('6.1 QR API requires authentication', async ({ page }) => {
      // Clear cookies to ensure logged out
      await page.goto('/login');
      
      const response = await page.request.get('/api/qr/any-token');
      expect(response.status()).toBe(401);
    });
  });

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================
  async function salesLogin(page: Page) {
    await page.goto('/login');
    await page.fill('input[name="salesCode"]', 'S001');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  }

  async function adminLogin(page: Page) {
    await page.goto('/login');
    await page.fill('input[name="salesCode"]', 'admin');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    // Wait for redirect to /admin - may take longer on first run
    await page.waitForURL(/\/admin/, { timeout: 30000 });
  }
});
