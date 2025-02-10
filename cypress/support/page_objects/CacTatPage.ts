import { faker } from '@faker-js/faker';

class CacTatPage {
  visit() {
    cy.visit('./src/index.html');
  }

  getTitle() {
    return cy.title();
  }

  // Preenche os campos obrigatórios e submete o formulário
  fillMandatoryFieldsAndSubmit() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10); // Texto longo para o campo de texto

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();
  }

  // Preenche o formulário com um e-mail inválido
  fillFormWithInvalidEmail() {
    cy.get('#firstName').type('Walmyr');
    cy.get('#lastName').type('Lima e Silva Filho');
    cy.get('#email').type('walmyr@talkingabouttesting,com'); // E-mail inválido
    cy.get('#open-text-area').type('Teste');
  }

  // Preenche o campo telefone com valor não numérico
  fillPhoneWithInvalidValue() {
    cy.get('#phone').type('abcde');
  }

  // Preenche o campo telefone com valor válido
  fillPhoneWithValidValue(phone: string) {
    cy.get('#phone').type(phone);
  }

  // Verifica se o campo de telefone está vazio
  verifyPhoneIsEmpty() {
    cy.get('#phone').should('have.value', '');
  }

  // Marca o checkbox de telefone
  checkPhoneCheckbox() {
    cy.get('#phone-checkbox').check();
  }

  // Limpa os campos
  clearFields() {
    cy.get('#firstName').clear();
    cy.get('#lastName').clear();
    cy.get('#email').clear();
    cy.get('#phone').clear();
  }

  // Marca o tipo de atendimento (Feedback, Suporte, etc.)
  markServiceType(type: string) {
    cy.get('input[type="radio"][value="' + type + '"]').check().should('be.checked');
  }

  // Marca ambos os checkboxes, depois desmarca o último
  markAndUnmarkCheckboxes() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  }

  // Seleciona um produto no dropdown
  selectProduct(product: string) {
    cy.get('#product').select(product).should('have.value', product.toLowerCase());
  }

  // Verifica se a mensagem de sucesso está visível
  getSuccessMessage() {
    return cy.get('.success');
  }

  // Verifica se a mensagem de erro está visível
  getErrorMessage() {
    return cy.get('.error');
  }

  // Verifica a visibilidade e desaparecimento das mensagens de sucesso e erro
  checkMessages() {
    this.getSuccessMessage().should('be.visible');
    cy.tick(3000);
    this.getSuccessMessage().should('not.be.visible');
    
    this.getErrorMessage().should('be.visible');
    cy.tick(3000);
    this.getErrorMessage().should('not.be.visible');
  }

  // Submete o formulário
  submitForm() {
    cy.contains('button', 'Enviar').click();
  }

  // Verifica a página de Política de Privacidade
  verifyPrivacyPolicyLink() {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  }

  // Acessa a página de Política de Privacidade removendo o target e clicando no link
  accessPrivacyPolicy() {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click();
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  }

  // Faz uma requisição HTTP para garantir a existência da página
  makeHttpRequest() {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200);
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK');
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT');
  }

  // Mostra o gato escondido
  showHiddenCat() {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible');
    cy.get('#title')
      .invoke('text', 'CAT TAT');
    cy.get('#subtitle')
      .invoke('text', 'Eu 🩷 gatos!');
  }
}

export default new CacTatPage();
