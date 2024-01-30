// CAC-TAT.spec.js created with Cypress

describe("Testes básicos CAC-TAT", function () {
  // Determinar acesso da página de referência a cada novo teste
  beforeEach(() => {
    cy.visit("./src/index.html"); // realiza acesso à Página para realização dos testes
  });
  it("Verificar Título da página", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT"); // valida o título da Página
  });

  /* // exemplo:
  it("Validar entrada de dados em campo do tipo Texto", function{
    cy
      .get('input[type="text"]') // seleciona um elemento web
      .should('be.visible') // determina que o elemento está presente/visível
  .type('Texto de entrada') // realiza uma entrada de dados do tipo texto
      .should('have.value', 'Texto de entrada') // faz o assertion (asserção) do dado no elemento web
  })
  */

  it("Preenche os campos obrigatórios e envia o formulário", function () {
    // Preenchimento dos campos obrigatórios:
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgSuccess();
  });

  it("Preenche email inválido", function () {
    cy.wName();
    cy.wSurname();
    cy.get('input[id="email"]').type("email@test;com");
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();

    // Valida mensagem:
    cy.msgErro();
  });

  it("Campo telefone vazio para valores não-numéricos", function () {
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone"')
      .type("valor-não-numérico")
      .should("have.value", "");
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgSuccess();
  });

  it("Telefone obrigatório não preenchido", function () {
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone-checkbox"').check();
    // cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgErro();
  });

  it("Check Telefone e preenche campo Telefone", () => {
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone-checkbox"').check();
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgSuccess();
  });

  it("Mensagem de erro para formulário vazio", function () {
    cy.hitSubmit();
    cy.msgErro();
  });

  it("Preenche Form com recurso Custom Commands", function () {
    cy.fillMandatorySubmitForm();
    cy.msgSuccess();
  });

  it("Seleciona Produto (YouTube) por texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Seleciona Produto (Mentoria) por value", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona Produto (Blog) por index", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("Seletor radio (Feedback)", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Seleciona cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("Seleciona todos os checkboxes e desmarca o último", () => {
    cy.get('input[type="checkbox')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("Upload de arquivo", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/uploads/sample_file.txt")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("sample_file.txt");
      });
  });

  it("Upload de arquivo (drag-drop)", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/uploads/sample_file.txt", {
        action: "drag-drop",
      })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("sample_file.txt");
      });
  });

  it("Upload de arquivo usando alias", () => {
    cy.fixture("uploads/sample_file.txt").as("sampleFile");
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("@sampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("sample_file.txt");
      });
  });

  it("Verifica atributo target de um link", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("Removendo atributo", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("CAC TAT - Política de privacidade").should("be.visible");
  });

  it("testa a página da política de privacidade de forma independente", () => {
    cy.get("#privacy a")
      .should("be.visible")
      .invoke("removeAttr", "target")
      .click();

    cy.title().should(
      "be.equal",
      "Central de Atendimento ao Cliente TAT - Política de privacidade"
    );
    cy.get('h1[id="title"]')
      .should("be.visible")
      .contains("CAC TAT - Política de privacidade");

    cy.get('div[id="white-background"]').should("be.visible");
    cy.get('div[id="white-background"] p')
      .should("have.length", 4)
      .each(($text) => {
        cy.wrap($text).should("be.visible");
      });
  });
});
