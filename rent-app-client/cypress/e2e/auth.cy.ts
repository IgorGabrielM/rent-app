describe('Autenticação', () => {

  const user = require('../../cypress.env.json')

  it('Should login user', () => {
    cy.visit('http://localhost:8100')

    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    cy.get('[data-testid="submit"]').click()
    cy.url().should('include', '/tabs/home');
  })
})