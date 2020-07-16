describe("Home-page test", () => {
  it("should visit home page", () => {
    cy.visit("/");
  });

 it("button should be disabled", () => {
    cy.get('.btn').eq(8).should('be.disabled')
 });

 it("should get error on add button", () => {
      cy.get('#name').type('do unit test');
      cy.get('#days').type('20');
      cy.get('.btn').click();
 });
});
