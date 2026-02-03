const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //ferramenta para gerar os relatorios do teste
  e2e: {
    setupNodeEvents(on, config) { 
      require('cypress-mochawesome-reporter/plugin')(on); //Ao final de cada execução é gerado um relatorio visual
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php', //usei baseUrl para não repetir o link em todos os testes
      },
});