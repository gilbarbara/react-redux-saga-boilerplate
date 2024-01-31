describe('React-Redux-Saga-Boilerplate', () => {
  it('basic', () => {
    cy.visit('/');

    // should have the correct tile
    cy.title().should('include', 'React Redux Saga Boilerplate');

    // should have a Start button and enter the app
    cy.findByTestId('Start').should('contain', 'Start').click();

    // should view the private area
    cy.findByTestId('Private').should('have.length', 1);

    // should have an alert and dismiss it
    cy.findByTestId('Alert').should('have.length', 1).findByRole('button').click();
    cy.findByTestId('Alert').should('not.exist');

    // should render the "react" repos
    cy.findByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-value', 'react')
      .find('a')
      .should('have.length', 30);

    // should toggle the selector
    cy.findByTestId('GitHubSelector')
      .find('button:last-child')
      .should('have.text', 'Redux')
      .click();

    // should render the "redux" repos
    cy.findByTestId('GitHubGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-value', 'redux')
      .find('a')
      .should('have.length', 30);

    // should be able to log out
    cy.findByTestId('Logout').click();

    // should have redirected to /
    cy.findByTestId('Home').should('have.length', 1);


    // should be able to start again
    cy.findByTestId('Start').should('contain', 'Start').click();
    cy.findByTestId('Private').should('have.length', 1);

    // should be able to log out again
    cy.findByTestId('Logout').click();

    cy.findByTestId('Home').should('have.length', 1);
  });
});
