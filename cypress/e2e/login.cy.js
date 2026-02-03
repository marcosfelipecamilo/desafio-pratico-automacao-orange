// Ignora erros que vêm de dentro do site (OrangeHRM) para o teste não parar
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

import loginPage from '../support/pages/LoginPage'

describe('Funcionalidade: Login e Logout', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('Validar mensagem de campo requerido para User e Pass', () => {
    // Chama o login vazio 
    loginPage.login('', '');
    
    // Verifica se as duas mensagens de "Required" aparecem
    loginPage.elements.requiredMessage()
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el).should('have.text', 'Required');
      });
  });

  it('Validar mensagem de credenciais inválidas', () => {
    loginPage.login('usuario_errado', 'senha123');
    
    loginPage.elements.alertError()
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('Login válido com credenciais corretas', () => {
    loginPage.login('Admin', 'admin123');
    
    // Valida que entrou no Dashboard
    cy.url().should('include', '/dashboard/index');
    cy.contains('h6', 'Dashboard').should('be.visible');
  });

  it('Efetuar logout e validar retorno à tela de login', () => {
    // Precisa logar primeiro para poder deslogar
    loginPage.login('Admin', 'admin123');
    
    // Chama o método de logout que adicionamos na Page
    loginPage.logout();

    // Validação final: Voltou para a tela de Login?
    cy.url().should('include', '/auth/login');
    cy.get('.orangehrm-login-title').should('have.text', 'Login');
  });

});