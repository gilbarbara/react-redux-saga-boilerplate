describe('React-Redux-Saga-Boilerplate', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'React Redux Saga Boilerplate');
  });

  it('should be able to start', () => {
    cy.getByTestId('Login')
      .should('contain', 'Start')
      .click();
  });

  it('should be able to view the private area', () => {
    cy.getByTestId('PrivateWrapper')
      .should('have.length', 1)
      .getByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'react');

    cy.getByTestId('GitHubGrid')
      .get('li')
      .should('have.length', 30);
  });

  it('should be able to dismiss the alert', () => {
    cy.getByTestId('AlertWrapper').should('have.length', 1);
    cy.getByTestId('AlertButton').click();
    cy.wait(300)
      .queryByTestId('AlertWrapper')
      .should('not.exist');
  });

  it('should be able to toggle the selector', () => {
    cy.getByTestId('GitHubSelector')
      .find('button:last-child')
      .not('[disabled]')
      .should('have.text', 'Redux')
      .click();
  });

  it('should render the redux repos ', () => {
    cy.getByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'redux');
  });

  it('should be able to logout', () => {
    cy.get('[class^=Logout]').click();
  });

  it('should have redirected to /', () => {
    cy.getByTestId('HomeWrapper').should('have.length', 1);
  });

  it('should be able to start again', () => {
    cy.getByTestId('Login')
      .should('contain', 'Start')
      .click();

    cy.getByTestId('PrivateWrapper').should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('[class^=Logout]').click();

    cy.getByTestId('HomeWrapper').should('have.length', 1);
  });
});
