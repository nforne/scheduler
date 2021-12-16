describe("Navigation", () => {
    it("should visit root", () => {
      cy.visit("/");
    });
  });

describe("Navigation", () => {
    it("should navigate to Tuesday and click", () => {
      cy.visit("/");
      cy.contains("li", "Tuesday")
        .click()
        .should("have.css", "background-color", "rgb(242, 242, 242)");
    });
  });