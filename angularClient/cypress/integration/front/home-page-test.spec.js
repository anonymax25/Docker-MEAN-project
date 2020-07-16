describe("Home-page test", () => {
  it("should visit home page", () => {
    cy.visit("/");
     cy.request('GET', 'http://localhost:8181/task')
            .then((res) => {
              expect(res.status).to.eq(200)
    })
  });

 /*it("button should be disabled", () => {
    cy.get('.btn').eq(8).should('be.disabled')
 });*/

 it("should get error on add button", () => {
      cy.get('#name').type('do unit test');
      cy.get('#days').type('20');
      cy.get('.btn-dark').click();

      cy.request('POST','http://localhost:8181/task')
        .then((res) => {
          expect(res.status).to.eq(204)
      })
      cy.request('GET', 'http://localhost:8181/task')
        .then((res) => {
          expect(res.status).to.eq(200)
      })
 });
});
