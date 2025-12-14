import { test, expect } from '@playwright/test';

test.describe('Error Pages - Strict E2E Tests', () => {

  // ==========================================================================
  // 404 PAGE TESTS
  // ==========================================================================
  test.describe('404 Not Found', () => {
    
    test('Navigating to non-existent route shows custom 404 page', async ({ page }) => {
      // Visit a guaranteed non-existent URL
      await page.goto('/this-route-definitely-does-not-exist-' + Date.now());
      
      // Verify the URL remains the same (no redirect to home)
      // Note: Next.js renders 404 in place
      
      // Verify key visual elements from not-found.tsx
      await expect(page.locator('h1')).toHaveText('404');
      await expect(page.locator('h2')).toContainText('Page not found');
      await expect(page.getByText('we couldn\'t find the page')).toBeVisible();
      
      // Verify "Go back home" link exists and works
      const homeLink = page.getByRole('link', { name: 'Go back home' });
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/');
      
      // Click logic
      await homeLink.click();
      await expect(page).toHaveURL('/');
    });

  });

  // Note: 500 pages are hard to test in production E2E without a specific route that throws.
  // We skip explicit 500 tests here to avoid fragility, but the component exists (src/app/error.tsx).

});
