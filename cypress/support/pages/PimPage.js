class PimPage {
  elements = {
    pimMenu: () => cy.contains('span', 'PIM'),
    addBtn: () => cy.get('.oxd-button').contains('Add'),
    firstNameInput: () => cy.get('input[name="firstName"]'),
    lastNameInput: () => cy.get('input[name="lastName"]'),
    saveBtn: () => cy.get('button[type="submit"]'),
    successToast: () => cy.get('.oxd-toast'),
    editIcon: () => cy.get('.bi-pencil-fill'),
    genderMale: () => cy.get('input[type="radio"][value="1"]'),
    genderFemale: () => cy.get('input[type="radio"][value="2"]'),
    employeeIdInput: () => cy.get('.oxd-input-group').contains('Employee Id').parent().parent().find('input'),
    tableRow: () => cy.get('.oxd-table-card'),
    searchInput: () => cy.get('.oxd-autocomplete-text-input > input').first()
  }

  goToPim() {
    // Força o clique no menu lateral para garantir a navegação correta
    cy.get(':nth-child(2) > .oxd-main-menu-item').click(); 
    cy.url().should('include', '/pim/viewEmployeeList');
  }

  addEmployee(fname, lname) {
    this.elements.addBtn().should('be.visible').click();
    this.elements.firstNameInput().should('be.visible').type(fname);
    this.elements.lastNameInput().type(lname);
    
    // Limpa o ID gerado automaticamente para evitar conflitos
    cy.get('.oxd-grid-2 .oxd-input').last().clear().should('have.value', '');
    
    this.elements.saveBtn().click();
    // Timeout estendido para aguardar o processamento do banco de dados demo
    cy.contains('Successfully Saved', { timeout: 15000 }).should('be.visible');
  }

  deleteEmployee(name) {
    this.elements.searchInput().should('be.visible').clear().type(name);
    cy.get('button[type="submit"]').click({ force: true });
    
    // Aguarda a tabela atualizar (o spinner sumir)
    cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');
    
    // Localiza a linha específica do funcionário antes de clicar no lixo
    cy.contains('.oxd-table-card', name, { timeout: 10000 })
      .find('.bi-trash')
      .click({ force: true });
      
    cy.get('.oxd-button--label-danger').click();
    cy.contains('Successfully Deleted', { timeout: 10000 }).should('be.visible');
    
    // Limpa o filtro para resetar a tela
    cy.get('.oxd-button--ghost').click({ force: true });
  }

  editEmployee(currentName, newName, newNumber, gender) {
    this.elements.searchInput().should('be.visible').clear().type(currentName);
    cy.get('button[type="submit"]').click({ force: true });
    
    // Garante que a linha apareceu na tabela antes de tentar editar
    cy.get('.oxd-loading-spinner').should('not.exist');
    cy.contains('.oxd-table-card', currentName, { timeout: 10000 }).should('be.visible');

    // Clica no ícone de editar com proteção contra re-renderização do DOM
    this.elements.editIcon()
      .first()
      .should('be.visible')
      .click({ force: true }); 
    
    // Aguarda o formulário de detalhes carregar
    this.elements.firstNameInput().should('be.visible').clear().type(newName);
    this.elements.employeeIdInput().clear().type(newNumber);

    // Seleção de gênero com tratamento de string
    if (gender.toLowerCase() === 'male') {
      this.elements.genderMale().click({ force: true });
    } else {
      this.elements.genderFemale().click({ force: true });
    }

    this.elements.saveBtn().first().click();
    cy.contains('Successfully Updated', { timeout: 10000 }).should('be.visible');
  }
}

export default new PimPage();