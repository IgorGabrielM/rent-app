describe('Criação de contrato', () => {

  it('Should create contact', () => {
    cy.login()

    cy.get('[tab="contracts"]').click()
    cy.get('[data-testid="create-contract"]').click()
    cy.get('[data-testid="identifier"]').type('001')
    cy.get('[data-testid="cep"]').type('13333333')
    cy.get('[data-testid="neighborhood"]').type('Bairro 1')
    cy.get('[data-testid="street"]').type('Rua 1')
    cy.get('[data-testid="numberHouse"]').type('10')
    cy.get('[data-testid="complement"]').type('Complemento')
    cy.get('[data-testid="endDateLocate"]').type('2024-01-12')

    cy.get('[data-testid="contact"]').click()
    cy.get('[class="sc-ion-select-popover-md md hydrated"]').first().click()

    cy.get('[data-testid="assets"]').click()
    cy.get('[class="sc-ion-select-popover-md md in-item interactive hydrated"]').first().click()

    cy.get('[data-testid="OpenContractTerms"]').click()

  })
})