describe("The Home Page", () => {
  before(() => {});

  // it("loads login page", () => {
  //   cy.get("h2").findByText(/Login/i);

  //   cy.findByLabelText(/Username/i).type("1");
  //   cy.findByLabelText(/Password/i).type("1");
  // });

  it("login", () => {
    // Call your custom cypress command
    cy.login();

    // Wait until the intercepted request is ready
    cy.visit("/");

    cy.findAllByText(/Logged in as: /i);
  });
});
