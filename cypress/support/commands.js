Cypress.Commands.add('login', (username, password) => {
  cy.visit('/web/index.php/auth/login');

  cy.get('input[name="username"]', { timeout: 10000 })
  .should('be.visible')
  .type(username);
  
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});