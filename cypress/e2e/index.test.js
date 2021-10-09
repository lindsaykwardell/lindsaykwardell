describe('The Home Page', () => {
  it('should visit the home page', () => {
    cy.visit(Cypress.config().baseUrl + '/')
  })

  it('should navigate between pages', () => {
    cy.visit(Cypress.config().baseUrl + '/')
    cy.get('[href="/about"]').click()
    cy.get('[href="/blog"]').click()
    cy.get('[href="/podcast"]').click()
  })

  it('should render the latest post on the home page', () => {
    cy.visit(Cypress.config().baseUrl + '/')
    cy.get('.blog-item')
      .should('have.length', 1)
      .get('.blog-item a')
      .should('have.attr', 'href')
      .get('.blog-item img')
      .should('exist')
      .get('.blog-item h3')
      .should(($h3) => {
        expect($h3[0].innerText).to.not.equal('')
      })
  })

  it('should display blog posts on the blog page', () => {
    cy.visit(Cypress.config().baseUrl + '/blog')
    cy.get('.blog-item').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('a')
          .should('have.attr', 'href')
          .get('img')
          .should('exist')
          .get('h3')
          .should(($h3) => {
            expect($h3[0].innerText).to.not.equal('')
          })
      })
    })
  })

  it('should display podcasts on the podcast page', () => {
    cy.visit(Cypress.config().baseUrl + '/podcast')
    cy.get('.blog-item').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('a')
          .should('have.attr', 'href')
          .get('img')
          .should('exist')
          .get('h3')
          .should(($h3) => {
            expect($h3[0].innerText).to.not.equal('')
          })
      })
    })
  })

  it('dark mode toggle button should toggle dark mode', () => {
    localStorage.setItem('darkMode', 'false')
    cy.visit(Cypress.config().baseUrl + '/')
    cy.get('.dark-mode-button').click()
    cy.get('html').should('have.class', 'dark')
    cy.get('.dark-mode-button').click()
    cy.get('html').should('not.have.class', 'dark')
  })
})
