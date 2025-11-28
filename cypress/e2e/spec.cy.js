describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#root a[href="/login"]').click();
    cy.get('#login_form_email').click();
    cy.get('#login_form_email').click();
    cy.get('#login_form_email').type('test@gmail.com');
    cy.get('#login_form_password').click();
    cy.get('#login_form_password').type('test');
    cy.get('#login_form button.ant-btn span').click();
    cy.get('#root a[href="/quoterequestlist"]').click();
    cy.get('#quote-request-form_name').click();
    cy.get('#quote-request-form_name').type('test E2E quote request ');
    cy.get('#quote-request-form button.ant-btn').click();
    cy.get('#root div:nth-child(2) > div.ant-row > div:nth-child(1) > div.product > div.ant-card-body > div:nth-child(2) > button.ant-btn').click();
    cy.get('#root div.ant-input-number-focused span.ant-input-number-handler-up span.anticon svg').click();
    cy.get('#root div:nth-child(2) > div.ant-row > div:nth-child(2) > div.product > div.ant-card-body > div:nth-child(2) > button.ant-btn').click();
    cy.get('#root sup.ant-badge-count').click();
    cy.get('#root input[value="61"]').check();
    cy.get('#root button.ant-btn-primary span').click();
  })
})