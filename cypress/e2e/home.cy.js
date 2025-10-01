// Basic smoke tests for Inna Kitchen site
describe('Inna Kitchen homepage', () => {
  it('loads successfully (status 200)', () => {
    cy.request('/').its('status').should('eq', 200);
  });

  it('renders HTML and has brand text', () => {
    cy.visit('/');
    cy.document().its('contentType').should('contain', 'text/html');
    // Look for common brand markers (English or Thai)
    cy.contains(/Inna\s?Kitchen|อินนา|ครัวน้อย|อร่อยมาก/i, { matchCase: false });
  });

  it('has a call-to-action link to order section if present', () => {
    cy.visit('/');
    cy.get('a[href*="#order"], a[href*="line.me"], a[href^="https://lin.ee"]', { timeout: 5000 }).should('exist');
  });
});
