import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CacTatPage from '../../support/page_objects/CacTatPage';


Given('Eu acesso a página inicial', () => { 
  CacTatPage.visit();
});

Then('verifica o título da aplicação', () => {
  CacTatPage.getTitle().should('equal', 'Central de Atendimento ao Cliente TAT');
})
Given('que estou na página inicial da Central de Atendimento ao Cliente TAT', () => {
  CacTatPage.visit();
});

// Passo para preencher os campos obrigatórios e enviar o formulário
When('preencho os campos obrigatórios e envio o formulário', () => {
  CacTatPage.fillMandatoryFieldsAndSubmit();
});

// Passo para verificar a mensagem de sucesso
Then('a mensagem de sucesso deve ser exibida', () => {
  CacTatPage.getSuccessMessage().should('be.visible');
});

When('preencho o formulário com um e-mail com formatação inválida', () => {
  CacTatPage.fillFormWithInvalidEmail();
});

When('envio o formulário', () => {
  CacTatPage.submitForm();
});

Then('a mensagem de erro deve ser exibida', () => {
  CacTatPage.getErrorMessage().should('be.visible');
});

Then('a mensagem de erro deve ser ocultada após 3 segundos', () => {
  cy.wait(3000);  // Avança o tempo de 3 segundos
  CacTatPage.getErrorMessage().should('not.be.visible');
});

Given('que eu esteja na página de formulário', () => {
  CacTatPage.visit(); // Visita a página
});

When('eu preencher o campo de telefone com {string}', (value) => {
  CacTatPage.fillPhoneWithInvalidValue(); // Preenche o campo com valor inválido
});

Then('o campo de telefone deve permanecer vazio', () => {
  CacTatPage.verifyPhoneIsEmpty(); // Verifica se o campo está vazio
});