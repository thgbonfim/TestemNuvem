Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  text: 'Test.',
}) => {
  // Verifica se todos os campos obrigatórios foram preenchidos corretamente.
  if (!data.firstName || !data.lastName || !data.email) {
    throw new Error('Os campos First Name, Last Name e Email são obrigatórios.')
  }

  // Preenche os campos do formulário
  cy.get('#firstName').type(data.firstName).should('have.value', data.firstName)
  cy.get('#lastName').type(data.lastName).should('have.value', data.lastName)
  cy.get('#email').type(data.email).should('have.value', data.email)

  // Preenche a área de texto apenas se o valor "text" for passado no objeto.
  if (data.text) {
    cy.get('#open-text-area').type(data.text).should('have.value', data.text)
  }

  // Envia o formulário
  cy.contains('button', 'Enviar').click()
})
