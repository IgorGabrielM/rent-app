describe('Ciração de contato', () => {

  it('Should create contact', () => {
    cy.login()

    cy.get('[tab="contacts"]').click()
    cy.get('[data-testid="create-contact"]').click()

    cy.get('[data-testid="name"]').type('Contato para teste')
    cy.get('[data-testid="telephone"]').type('19 999999999')
    cy.get('[data-testid="email"]').type('email.test@gmail.com')
    cy.get('[data-testid="submit"]').click()
  })
})