// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", () => {
  cy.intercept("/api/auth/session", { fixture: "session.json" }).as(
    "loginSession"
  );

  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // This step can probably/hopefully be improved.
  // We are currently unsure about this part.
  // We need to refresh this cookie once in a while.
  // We are unsure if this is true and if true, when it needs to be refreshed.
  cy.setCookie(
    "next-auth.session-token",
    "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlibUZ0WlNJNkltRmtiV2x1SWl3aWFXRjBJam94TmpVNE56VXhOREkxTENKbGVIQWlPakUyTlRnM05USTJNalY5LmQtdGNqalpKRktaeG93WFVWYWhCSUl0R3hqNHVkWi1RVVJ1MDhodWZBa1kiLCJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlibUZ0WlNJNkltRmtiV2x1SWl3aWFXRjBJam94TmpVNE56UTFNemMxTENKbGVIQWlPakUyTmpZMU1qRXpOelY5Llp4RmFKdTlHT2VKVkVrRDZkbXJxaVNwVWN1YkZQR0pidkhvUWJPc3J3VU0iLCJpYXQiOjE2NTg3NTE0MjUsImV4cCI6MTY2MTM0MzQyNX0.lwzOu18ohgPSm27EnLd1_ZV0kenon3ryI1tF2Gvs6EyA17PQWeGeAguTtyTkjQK4Y-lOLK4xyhDpEJ8Fo0o21A"
  );
});
