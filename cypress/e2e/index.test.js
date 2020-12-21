describe('The Home Page', () => {
  it('should visit the home page', () => {
    cy.visit(Cypress.config().baseUrl + '/')
  })

  it('should navigate between pages', () => {
    cy.visit(Cypress.config().baseUrl + '/')
    cy.get('[href="/about-me"]').click()
    cy.get('[href="/blog/"]').click()
    cy.get('[href="/podcast"]').click()
  })

  // it('should allow searching podcasts', () => {
  //   cy.visit(Cypress.config().baseUrl + '/')
  //   cy.get('[href="/podcast"]').click()
  //   cy.get('#search-input', {timeout: 10000}).click().type("this should return nothing because it doesn't match")
  //   cy.wait(2000)
  //   cy.get(".blog-item").should('not.exist')
  //   cy.get('#search-input').click().clear().type("meet our new panel")
  // })
})
