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
  }//Aqui está contralizado os elementos(Seletores)

  goToPim() {
    this.elements.pimMenu().click({ force: true }); 
    cy.url().should('include', '/pim/viewEmployeeList');
    cy.contains('h5', 'Employee Information', { timeout: 10000 }).should('be.visible');
  }//Esperas explicitas

  addEmployee(fname, lname) {
    this.elements.addBtn().should('be.visible').click();
    this.elements.firstNameInput().should('be.visible').type(fname);
    this.elements.lastNameInput().type(lname);
    
    // Garante que o ID foi limpo antes de seguir
    cy.get('.oxd-grid-2 .oxd-input').last().clear().should('have.value', '');
    
    this.elements.saveBtn().click();
    // Timeout maior para o banco de dados do demo processar
    cy.contains('Successfully Saved', { timeout: 15000 }).should('be.visible');
  }

  deleteEmployee(name) {
    // Garante que a página carregou antes de buscar
    this.elements.searchInput().should('be.visible').clear().type(name);
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');
    
    // Verifica se a linha apareceu antes de tentar clicar no lixo
    cy.contains('.oxd-table-card', name, { timeout: 10000 })
      .find('.bi-trash')
      .click();
      
    cy.get('.oxd-button--label-danger').click();
    cy.contains('Successfully Deleted', { timeout: 10000 }).should('be.visible');
    
    // Limpa o filtro com segurança
    cy.get('.oxd-button--ghost').click({ force: true });
  }

  editEmployee(currentName, newName, newNumber, gender) {
    this.elements.searchInput().should('be.visible').clear().type(currentName);
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('.oxd-loading-spinner').should('not.exist');

    this.elements.editIcon().first().should('be.visible').click();
    
    // Espera o carregamento dos dados da API no formulário
    cy.intercept('GET', '**/pim/viewPersonalDetails/**').as('getDetails');
    this.elements.firstNameInput().should('not.have.value', '');
    this.elements.firstNameInput().clear().should('have.value', '').type(newName);
    this.elements.employeeIdInput().clear().should('have.value', '').type(newNumber);

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