describe('End to end tests', () => {
    it('Shows the correct elements on start page', () => {
        cy.visit('/')
        cy.get('h1').contains('Create people')
    })
})