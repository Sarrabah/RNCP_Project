describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('#root a[href="/login"]').click();
    cy.get('#login_form_email').click();
    cy.get('#login_form_email').click();
    cy.get('#login_form_email').type('test@gmal.com');
    cy.get('#login_form_email').clear();
    cy.get('#login_form_email').type('test@gmail.com');
    cy.get('#login_form_password').click();
    cy.get('#login_form_password').type('test');
    cy.get('#login_form button.ant-btn').click();
    cy.get('svg[fill-rule="evenodd"]').click();
    cy.get('#root svg[data-icon="user"]').trigger('mouseover');
    cy.get('.ant-dropdown-menu').should('be.visible');
    cy.get('span.ant-dropdown-menu-title-content span').click();
  })
})