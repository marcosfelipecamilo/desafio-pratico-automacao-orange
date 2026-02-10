describe('API Testing - OrangeHRM', () => {
  it('Deve cadastrar um funcionário via POST (API) e validar na interface', () => {
    
    // 1. Login (Corrigido para ir para a tela de LOGIN primeiro)
    cy.visit('/web/index.php/auth/login'); 
    
    cy.get('input[name="username"]', {timeout: 10000})
      .should('be.visible')
      .type('Admin');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Garante que o login terminou antes de chamar a API
    cy.url().should('include', '/dashboard/index');

    // 2. Requisição de API
    cy.request({
      method: 'POST',
      url: '/web/index.php/api/v2/pim/employees',
      body: {
        firstName: "QA",
        middleName: "API",
        lastName: "Tester",
        employeeId: "ID" + Math.floor(Math.random() * 100000)
      }
    }).then((response) => {
      // Verifica se a API respondeu com sucesso
      expect(response.status).to.eq(200);
      
      // Captura o número do funcionário gerado pelo sistema
      const empNumber = response.body.data.empNumber;

      // 3. Validação na Interface (URL corrigida com o caminho completo)
      cy.visit(`/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`);
      
      // Valida se o nome aparece na tela de detalhes
      cy.contains('h6', 'QA Tester', {timeout: 10000}).should('be.visible');
    });
  });
});