class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[type="submit"]'),
    alertError: () => cy.get('.oxd-alert'),
    // Captura a mensagem "Required"
    requiredMessage: () => cy.get('.oxd-input-field-error-message'),
    // Elementos para o Logout
    userDropdown: () => cy.get('.oxd-userdropdown-name'),
    logoutLink: () => cy.contains('a', 'Logout')
  }

  visit() {
    cy.visit('/auth/login');
  }

  login(user, pass) {
    if (user) this.elements.usernameInput().type(user);
    if (pass) this.elements.passwordInput().type(pass);
    this.elements.loginBtn().click();
  }

  // Adicionando o método de Logout
  logout() {
    this.elements.userDropdown().click();
    this.elements.logoutLink().click();
  }
}

export default new LoginPage();