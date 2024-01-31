const timeForward3s = 3000;
const longText = Cypress._.repeat('Fill with words. ', 15);

Cypress.Commands.add('wName', () => {
  cy.get('input[name="firstName"]')
    .should('be.visible')
    /*
    .type(Cypress.env("name")) // use apenas localmente
    .should("have.value", Cypress.env("name")); // use apenas localmente
    */
    .type('Carolyn')
    .should('have.value', 'Carolyn');
});

Cypress.Commands.add('wSurname', () => {
  cy.get('input[name="lastName"]')
    .should('be.visible')
    /*
    .type(Cypress.env("surname")) // use apenas localmente
    .should("have.value", Cypress.env("surname")); // use apenas localmente
    */
    .type('Mackenzie')
    .should('have.value', 'Mackenzie');
});

Cypress.Commands.add('wEmail', () => {
  cy.get('input[id="email"]')
    .should('be.visible')
    /*
    .type(Cypress.env("email")) // use apenas localmente
    .should("have.value", Cypress.env("email")) // use apenas localmente
    */
    .type('heather.blake@trust.me')
    .should('have.value', 'heather.blake@trust.me');
});

// Telefone não é um campo obrigatório desde que o check de telefone esteja vazio
Cypress.Commands.add('wPhone', () => {
  /* // use apenas localmente
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
  */

  cy.get('input[id="phone-checkbox"]')
    .invoke('prop', 'checked')
    .then((isChecked) => {
      if (isChecked) {
        cy.get('input[id="phone"]')
          .should('be.visible')
          .type('21997487965')
          .should('have.value', '21997487965');
      } else {
        cy.get('input[id="phone"]')
          .should('be.visible')
          .clear()
          .should('have.value', '');
      }
    });
});

Cypress.Commands.add('wTxtarea', () => {
  cy.get('textarea[name="open-text-area"')
    .should('be.visible')
    /*
    .type(Cypress.env("txtarea"), { delay: 0 }) // use apenas localmente
    .should("have.value", Cypress.env("txtarea")); // use apenas localmente
    */
    // .type(longText, { delay: 0 })
    .invoke('val', longText)
    .should('have.value', longText);
});
//Envio do form:
Cypress.Commands.add('hitSubmit', () => {
  cy.get('button[type="submit"]')
    .should('be.visible')
    .contains('Enviar')
    .click();
});

Cypress.Commands.add('msgErro', function () {
  cy.get('.error').should('be.visible');
  cy.contains('span > strong', 'Valide os campos obrigatórios!');
  cy.tick(timeForward3s);
  cy.get('.error').should('not.be.visible');
});

Cypress.Commands.add('msgSuccess', function () {
  cy.get('.success').should('be.visible');
  cy.contains('span > strong', 'Mensagem enviada com sucesso.');
  cy.tick(timeForward3s);
  cy.get('.success').should('not.be.visible');
});
