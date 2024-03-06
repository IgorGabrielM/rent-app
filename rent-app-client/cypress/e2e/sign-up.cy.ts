describe('Criação de usuário', () => {

  const user = require('../../cypress.env.json')

  it('Should create user', () => {
    cy.visit('http://localhost:8100')

    cy.get('[data-testid="link-to-signup"]').click()
    cy.get('[data-testid="userName"]').type(user.name)
    cy.get('[data-testid="cnpj"]').type(user.cnpj)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    cy.get('[data-testid="password-confirm"]').type(user.password)
    cy.get('[data-testid="contract-terms"]').type("O contrato vigente informa que ao assinar estará concordando com o valor seguinte.")
    cy.get('[data-testid="submit"]').click()
    cy.url().should('include', '/tabs/home');
  })
})