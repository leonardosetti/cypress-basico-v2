Cypress.Commands.add("wName", () => {
  cy.get('input[name="firstName"]')
    .should("be.visible")
    .type(Cypress.env("name"))
    .should("have.value", Cypress.env("name"));
});

Cypress.Commands.add("wSurname", () => {
  cy.get('input[name="lastName"]')
    .should("be.visible")
    .type(Cypress.env("surname"))
    .should("have.value", Cypress.env("surname"));
});

Cypress.Commands.add("wEmail", () => {
  cy.get('input[id="email"]')
    .should("be.visible")
    .type(Cypress.env("email"))
    .should("have.value", Cypress.env("email"));
});

// Telefone não é um campo obrigatório desde que o check de telefone esteja vazio
Cypress.Commands.add("wPhone", () => {
  cy.get('input[id="phone-checkbox"]')
    .invoke("prop", "checked")
    .then((isChecked) => {
      if (isChecked) {
        cy.get('input[id="phone"]')
          .should("be.visible")
          .type(Cypress.env("phone"))
          .should("have.value", Cypress.env("phone"));
      } else {
        cy.get('input[id="phone"]')
          .should("be.visible")
          .clear()
          .should("have.value", "");
      }
    });
});

Cypress.Commands.add("wTxtarea", () => {
  cy.get('textarea[name="open-text-area"')
    .should("be.visible")
    .type(Cypress.env("txtarea"), { delay: 0 })
    .should("have.value", Cypress.env("txtarea"));
});
//Envio do form:
Cypress.Commands.add("hitSubmit", () => {
  cy.get('button[type="submit"]')
    .should("be.visible")
    .contains("Enviar")
    .click();
});

Cypress.Commands.add("fillMandatorySubmitForm", () => {
  // Preenchimento dos campos obrigatórios:

  cy.wName();
  cy.wSurname();
  cy.wEmail();
  cy.wPhone();
  cy.wTxtarea();
  cy.hitSubmit();
});

Cypress.Commands.add("msgErro", function () {
  cy.get(".error").should("be.visible");
  cy.contains("span > strong", "Valide os campos obrigatórios!");
});

Cypress.Commands.add("msgSuccess", function () {
  cy.get(".success").should("be.visible");
  cy.contains("span > strong", "Mensagem enviada com sucesso.");
});
