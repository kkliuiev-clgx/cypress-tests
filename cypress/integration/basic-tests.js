  describe('Test Crewing Crm Tests', function() {

  beforeEach(function () {
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.clearCookies();
    cy.getCookies().should('be.empty')
  cy.visit(Cypress.env('baseUrl'))
  })

  it('Opens login page and checks', function() {
    cy.server()
    cy.route('POST', Cypress.env('baseUrl')+'/api/login').as('api-login')
    cy.route('GET', Cypress.env('baseUrl')+'/api/info').as('api-info')
    cy.route('GET', Cypress.env('baseUrl')+'/api/dashboard/contracts-chart').as('contracts-chart')
    cy.get(':nth-child(1) > .form-control').type(Cypress.env('userName'))
    cy.get(':nth-child(2) > .form-control').type(Cypress.env('password'))
    cy.get('.btn').click()
    cy.wait('@api-login').should((xhr)=> {
        cy.wait('@api-info').should((xhr)=> {
            cy.wait('@contracts-chart').should((xhr)=> {
    expect(xhr.status).to.eq(200)
    cy.get(':nth-child(1) > .ui-menuitem-link').trigger('mouseover')
    })
})
    })
  })
  
})
