describe('React-Redux-Saga-Boilerplate', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title()
      .should('include', 'react-redux-saga-boilerplate');
  });

  it('should be able to login', () => {
    cy.get('.btn')
      .should('contain', 'Login')
      .click();
  });

  it('should be able to view the private area', () => {
    cy.get('.app__private')
      .should('have.length', 1);

    cy.get('.app__github')
      .should('have.length', 1);
    cy.get('.app__github__grid')
      .should('have.length', 1)
      .should('have.class', 'app__github__grid--react');

    cy.get('.app__github__grid li')
      .should('have.length', 30);
  });

  it('should be able to toggle the selector', () => {
    cy.get('.app__github__selector .btn:last-child')
      .not('[disabled]')
      .should('have.text', 'Redux')
      .click();
  });

  it('should render the redux repos ', () => {
    cy.get('.app__github__grid')
      .should('have.length', 1)
      .should('have.class', 'app__github__grid--redux');
  });

  it('should be able to logout', () => {
    cy.get('.app__logout')
      .click();
  });

  it('should have redirected to /', () => {
    cy.get('.app__home')
      .should('have.length', 1);
  });

  it('should be able to login again', () => {
    cy.get('.btn').should('contain', 'Login').click();

    cy.get('.app__private')
      .should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('.app__logout')
      .click();

    cy.get('.app__home')
      .should('have.length', 1);
  });
});
