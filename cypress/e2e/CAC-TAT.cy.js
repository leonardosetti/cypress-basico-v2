// CAC-TAT.spec.js created with Cypress

describe('Treinamento Cypress: TAT-CAC (Nível básico)', () => {
  // Determinar acesso da página de referência a cada novo teste
  beforeEach(() => {
    //    cy.visit('./src/index.html'); // realiza acesso à Página local para realização dos testes
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html');
  });
  it('Verificar Título da Página', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); // valida o título da Página
  });

  it('Preenche os campos obrigatórios e envia o formulário com sucesso', () => {
    // Preenchimento dos campos obrigatórios:
    // Este teste utiliza o recurso de Custom Commands (./support/commands.js)

    cy.clock();
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();

    // Valida mensagem:
    cy.msgSuccess();
  });

  it('Preenche email inválido e retorna uma mensagem de erro', () => {
    cy.clock();
    cy.wName();
    cy.wSurname();
    cy.get('input[id="email"]').type('email@test;com');
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();

    // Valida mensagem:
    cy.msgErro();
  });

  it('Preenche campo telefone com valores não-numéricos mantendo o campo vazio', () => {
    cy.clock();
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone"')
      .type('valor-não-numérico')
      .should('have.value', '');
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgSuccess();
  });

  it('Marca a opção de Telefone sem preencher o campo Telefone (obrigatório)', () => {
    cy.clock();
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone-checkbox"').check();
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgErro();
  });

  it('Marca a opção de Telefone e preenche o campo Telefone (obrigatório)', () => {
    cy.clock();
    cy.wName();
    cy.wSurname();
    cy.wEmail();
    cy.get('input[id="phone-checkbox"').check();
    cy.wPhone();
    cy.wTxtarea();
    cy.hitSubmit();
    cy.msgSuccess();
  });

  it('Envia formulário vazio e retorna mensagem de erro', () => {
    cy.clock();
    cy.hitSubmit();
    cy.msgErro();
  });

  it('Seleciona Produto (YouTube) por texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('Seleciona Produto (Mentoria) por value', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('Seleciona Produto (Blog) por index', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('Seleciona radio-button com valor Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback');
  });

  Cypress._.times(3, () => {
    // repete o teste 3 vezes
    it('Seleciona radio-button para cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
          cy.wrap($radio).check();
          cy.wrap($radio).should('be.checked');
        });
    });
  });

  it('Seleciona todos os checkboxes e desmarca o último', () => {
    cy.get('input[type="checkbox')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('Realiza upload de arquivo', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/uploads/sample_file.txt')
      .then(($input) => {
        //pode usar .should ou .then para call back
        expect($input[0].files[0].name).to.equal('sample_file.txt');
      });
  });

  it('Realiza upload de arquivo (drag-drop)', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/uploads/sample_file.txt', {
        action: 'drag-drop',
      })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('sample_file.txt');
      });
  });

  it('Realiza upload de arquivo usando Alias', () => {
    cy.fixture('example.json', { encoding: null }).as('exampleFile');
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@exampleFile')
      .then(($input) => {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });

  /*   it.only('Realiza upload de arquivo usando Alias (workaround para "Cypress ver 9.3.1")', () => {
    cy.fixture('example.json', { encoding: null }).as('exampleFile');
    cy.get('input[type="file"]')
      .selectFile({
        contents: '@exampleFile',
        fileName: 'example.json',
        mimeType: 'application/json',
      })
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });
 */

  it('Realiza upload de múltiplos arquivos', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile([
        'cypress/fixtures/uploads/sample_file.txt',
        'cypress/fixtures/example.json',
        'cypress/fixtures/new_dummy.json',
      ])
      .then(($input) => {
        // console.log($input);
        expect($input[0].files[0].name).to.equal('sample_file.txt');
        expect($input[0].files[1].name).to.equal('example.json');
        expect($input[0].files[2].name).to.equal('new_dummy.json');
      });
  });

  it('Realiza upload de múltiplos arquivos usando Drag and Drop', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile(
        ['cypress/fixtures/example.json', 'cypress/fixtures/new_dummy.json'],
        { action: 'drag-drop' } // quando usado, os arquivos não são carregados
      )
      .then(($input) => {
        console.log($input);
        expect($input[0].file[0].name).to.equal('example.json');
        expect($input[0].file[1].name).to.equal('new_dummy.json');
      });
  });

  it('Verifica o atributo target de um link', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  });

  it('Remove o atributo target de um elemento', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();
    cy.contains('CAC TAT - Política de privacidade').should('be.visible');
  });

  it('Verifica a página da política de privacidade de forma independente', () => {
    // pode ser colocado em uma nova .spec.js com cy.visit direto para a URL correspondente
    cy.get('#privacy a')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
    cy.title().should(
      'be.equal',
      'Central de Atendimento ao Cliente TAT - Política de privacidade'
    );
    cy.get('h1[id="title"]')
      .should('be.visible')
      .contains('CAC TAT - Política de privacidade');
    cy.get('div[id="white-background"]').should('be.visible');
    cy.get('div[id="white-background"] p')
      .should('have.length', 4)
      .each(($text) => {
        cy.wrap($text).should('be.visible');
      });
  });

  it('Demonstra uso do cy.invoke (parâmetros: show and hide) para mensagens', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  });
});
