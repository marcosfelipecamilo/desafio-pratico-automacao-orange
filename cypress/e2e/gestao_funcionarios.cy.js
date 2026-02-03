import loginPage from '../support/pages/LoginPage'
import pimPage from '../support/pages/PimPage'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});//Caso o site de algum erro interno ignore-o

describe('Fluxo de Gestão de Funcionários', () => {
  // Variável para armazenar o timestamp e usá-lo em todos os "its"
  const timestamp = new Date().getTime().toString().substring(9); //Adiciona um número na frente do nome para não repetição

  beforeEach(() => {
    // O teste precisa começar logado na tela PIM
    loginPage.visit(); 
    loginPage.login('Admin', 'admin123');
    pimPage.goToPim();
  });

  it('1. Deve cadastrar 3 funcionários com sucesso', () => {
    cy.fixture('users').then((users) => {
      users.forEach((user) => {
        const uniqueFirstName = `${user.firstName}_${timestamp}`;
        pimPage.addEmployee(uniqueFirstName, user.lastName);
        pimPage.goToPim(); 
      });
      // Validação: Garante que o último cadastrado aparece na lista
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

      // Validação: O primeiro nome não deve mais existir
      cy.contains(`${users[0].firstName}_${timestamp}`).should('not.exist');
    });
  });

  it('3. Deve editar o funcionário restante (Nome, ID e Gênero)', () => {
    cy.fixture('users').then((users) => {
      const nomeOriginal = `${users[2].firstName}_${timestamp}`;
      const novoNome = `Editado_${timestamp}`;
      const novoNumero = `999${timestamp}`;
      
      pimPage.editEmployee(nomeOriginal, novoNome, novoNumero, 'Male');

      // Validação final: Volta para a lista e verifica o novo nome
      pimPage.goToPim();
      cy.contains(novoNome).should('be.visible');
    });
  });
});