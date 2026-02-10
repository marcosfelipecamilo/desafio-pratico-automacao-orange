import loginPage from '../support/pages/LoginPage'
import pimPage from '../support/pages/PimPage'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Fluxo de Gestão de Funcionários', () => {
  const timestamp = new Date().getTime().toString().substring(9);

  beforeEach(() => {
    // 1. Visita a página de login corrigida
    loginPage.visit(); 
    
    // 2. Realiza o login
    loginPage.login('Admin', 'admin123');
    
    // 3. Aguarda o Dashboard carregar (evita o erro no menu PIM)
    cy.url().should('include', '/dashboard/index');
    
    // 4. Navega para o PIM
    pimPage.goToPim();
  });

  it('1. Deve cadastrar 3 funcionários com sucesso', () => {
    cy.fixture('users').then((users) => {
      users.forEach((user) => {
        const uniqueFirstName = `${user.firstName}_${timestamp}`;
        pimPage.addEmployee(uniqueFirstName, user.lastName);
        pimPage.goToPim(); 
      });
      cy.contains(`${users[2].firstName}_${timestamp}`).should('be.visible');
    });
  });

  it('2. Deve excluir os 2 primeiros funcionários da lista', () => {
    cy.fixture('users').then((users) => {
      const nomesParaExcluir = [
        `${users[0].firstName}_${timestamp}`, 
        `${users[1].firstName}_${timestamp}`
      ];

      nomesParaExcluir.forEach((nome) => {
        pimPage.deleteEmployee(nome);
      });

      cy.contains(`${users[0].firstName}_${timestamp}`).should('not.exist');
    });
  });

  it('3. Deve editar o funcionário restante (Nome, ID e Gênero)', () => {
    cy.fixture('users').then((users) => {
      const nomeOriginal = `${users[2].firstName}_${timestamp}`;
      const novoNome = `Editado_${timestamp}`;
      const novoNumero = `999${timestamp}`;
      
      pimPage.editEmployee(nomeOriginal, novoNome, novoNumero, 'Male');

      pimPage.goToPim();
      cy.contains(novoNome).should('be.visible');
    });
  });
});