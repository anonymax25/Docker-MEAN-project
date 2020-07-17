describe("Home-page test", () => {
  it("should visit home page", () => {
    cy.visit("/");
     cy.request('GET', 'http://localhost:8181/task')
            .then((res) => {
              expect(res.status).to.eq(200)
              expect(res).to.have.property('headers')
              expect(res).to.have.property('duration')
    })
  });

 it("button should be disabled", () => {
    cy.get('.btn-dark').should('be.disabled')
 });

 it("should add a new task", () => {
      cy.get('#name').type('do unit test');
      cy.get('#days').type('20');
      cy.get('.btn-dark').click();

      cy.request('GET', 'http://localhost:8181/task')
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res).to.have.property('headers')
          expect(res).to.have.property('duration')
      })
  });

  it("should delete a task", () => {
    cy.get('.btn-success').click();
  });
});
