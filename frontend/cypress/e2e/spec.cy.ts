describe('template spec', () => {
  it('passes', () => {
    cy.viewport('iphone-x') // Set viewport to 375px x 667px
    cy.visit('localhost:3000/login');
  })
})
