describe('API Testing - OrangeHRM', () => {
  it('Deve cadastrar um funcionário via POST (API) e validar na interface', () => {
    
    // 1. Login (Ajustado para evitar URL duplicada)
    // Se a sua baseUrl já termina em index.php, use apenas '/auth/login'
    cy.visit('/auth/login'); 
    
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // 2. Requisição de API
    cy.request({
      method: 'POST',
      url: '/api/v2/pim/employees', // Caminho relativo (o Cypress completa com a baseUrl)
      body: {
        firstName: "QA",
        middleName: "API",
        lastName: "Tester",
        employeeId: "ID" + Math.floor(Math.random() * 100000) // Gera um ID aleatório para não dar erro de duplicidade
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const empNumber = response.body.data.empNumber;

      // 3. Validação na Interface
      cy.visit(`/pim/viewPersonalDetails/empNumber/${empNumber}`);
      cy.contains('h6', 'QA Tester').should('be.visible');
    });
  });
});