describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('test', function() {
    cy.visit ('http://localhost:3000/')
  });
});

it('test2', function() {
  cy.visit('http://localhost:3000')
  cy.get('#root a[href="/login"]').click();
  cy.get('#login_form_email').click();
  cy.get('#login_form_email').type('test@gmail.com');
  cy.get('#login_form_password').click();
  cy.get('#login_form_password').type('test');
  cy.get('#login_form button.ant-btn span').click();
  cy.get('span.ant-dropdown-menu-title-content span').click();
});