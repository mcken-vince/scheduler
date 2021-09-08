describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  })

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones')
    cy.get('[alt="Sylvia Palmer"]').click();
    cy.contains('Save').click();
    // appointment saved
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones')
    .contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {

  });

  it('should delete an interview', () => {

  });
});