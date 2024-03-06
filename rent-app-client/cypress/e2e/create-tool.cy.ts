describe('Criação de ferramenta', () => {

  it('Should create tool category', () => {
    cy.login()

    cy.get('[tab="patrimony"]').click()
    cy.get('[data-testid="fab-tool"]').click()
    cy.get('[data-testid="create-tool-category"]').click()
    cy.get('[data-testid="name"]').type('Categoria de teste')
    cy.get('[data-testid="value"]').type('200')
    cy.get('[data-testid="submit"]').click()
  })

  it('Should create tool', () => {
    cy.login()

    cy.get('[tab="patrimony"]').click()
    cy.get('[data-testid="fab-tool"]').click()
    cy.get('[data-testid="create-tool"]').click()

    cy.get('[data-testid="identifier"]').type('001')
    cy.get('[data-testid="name"]').type('Categoria de teste')
    cy.get('[data-testid="tool-categories"]').click()
    cy.get('[class="sc-ion-select-popover-md md in-item interactive hydrated"]').first().click()
    cy.get('[data-testid="submit"]').click()
  })
})