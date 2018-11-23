describe('React-Redux-Saga-Boilerplate', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'react-redux-saga-boilerplate');
  });

  it('should be able to start', () => {
    cy.get('[class^=StyledButton]')
      .should('contain', 'Start')
      .click();
  });

  it('should be able to view the private area', () => {
    cy.get('[class^=PrivateWrapper]').should('have.length', 1);

    cy.get('[class^=GitHubWrapper]').should('have.length', 1);
    cy.get('[class^=GitHubGrid]')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'react');

    cy.get('[class^=GitHubGrid] li').should('have.length', 30);
  });

  it('should be able to toggle the selector', () => {
    cy.get('[class^=StyledButtonGroup] button:last-child')
      .not('[disabled]')
      .should('have.text', 'Redux')
      .click();
  });

  it('should render the redux repos ', () => {
    cy.get('[class^=GitHubGrid]')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'redux');
  });

  it('should be able to logout', () => {
    cy.get('[class^=Logout]').click();
  });

  it('should have redirected to /', () => {
    cy.get('[class^=HomeWrapper]').should('have.length', 1);
  });

  it('should be able to start again', () => {
    cy.get('[class^=HomeWrapper] button')
      .should('contain', 'Start')
      .click();

    cy.get('[class^=PrivateWrapper]').should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('[class^=Logout]').click();

    cy.get('[class^=HomeWrapper]').should('have.length', 1);
  });
});
