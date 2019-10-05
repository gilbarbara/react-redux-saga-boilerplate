describe('React-Redux-Saga-Boilerplate', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'React Redux Saga Boilerplate');
  });

  it('should be able to start', () => {
    cy.findByTestId('Login')
      .should('contain', 'Start')
      .click();
  });

  it('should be able to view the private area', () => {
    cy.findByTestId('PrivateWrapper')
      .should('have.length', 1)
      .findByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'react');

    cy.findByTestId('GitHubGrid')
      .get('li')
      .should('have.length', 30);
  });

  it('should be able to dismiss the alert', () => {
    cy.findByTestId('AlertWrapper').should('have.length', 1);
    cy.findByTestId('AlertButton').click();
    cy.wait(300)
      .queryByTestId('AlertWrapper')
      .should('not.exist');
  });

  it('should be able to toggle the selector', () => {
    cy.findByTestId('GitHubSelector')
      .find('button:last-child')
      .not('[disabled]')
      .should('have.text', 'Redux')
      .click();
  });

  it('should render the redux repos ', () => {
    cy.findByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'redux');
  });

  it('should be able to logout', () => {
    cy.get('[class^=Logout]').click();
  });

  it('should have redirected to /', () => {
    cy.findByTestId('HomeWrapper').should('have.length', 1);
  });

  it('should be able to start again', () => {
    cy.findByTestId('Login')
      .should('contain', 'Start')
      .click();

    cy.findByTestId('PrivateWrapper').should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('[class^=Logout]').click();

    cy.findByTestId('HomeWrapper').should('have.length', 1);
  });
});
