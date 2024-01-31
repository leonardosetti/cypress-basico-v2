describe('Testes de Requisições HTTP com Cypress', () => {
  it('Realizar uma requisição HTTP', () => {
    cy.request(
      'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    ).should(($response) => {
      console.log($response);
      const { status, statusText, body } = $response;
      expect(status).to.equal(200);
      expect(statusText).to.equal('OK');
      expect(body).to.include('CAC TAT');
    });
  });
});
