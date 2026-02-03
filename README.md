# Automação de Testes - Site: OrangeHRM (Cypress)

Este projeto automatiza fluxos principais do sistema OrangeHRM, cobrindo Login e Gestão de Funcionários.

## 🚀 Tecnologias
- Cypress 13+
- JavaScript
- Mochawesome Reporter (Relatórios)

## 📝 Plano de Testes (Cenários Automatizados)
O objetivo deste projeto é garantir a estabilidade das funcionalidades críticas do OrangeHRM através de testes de regressão automatizados.

### 1. Cenários de Login
* **CT-01: Login com Sucesso**
    * **Objetivo:** Validar acesso ao sistema com credenciais válidas.
    * **Resultado esperado:** Usuário redirecionado para o Dashboard e exibição da mensagem de boas-vindas.
* **CT-02: Login com Credenciais Inválidas**
    * **Objetivo:** Validar barreira de segurança.
    * **Resultado esperado:** Exibição da mensagem "Invalid credentials".
* **CT-03: Validação de Campos Obrigatórios**
    * **Objetivo:** Verificar se o sistema impede o envio de campos vazios.
    * **Resultado esperado:** Exibição de alertas de "Required" abaixo dos campos.

### 2. Gestão de Funcionários (Módulo PIM)
* **CT-04: Cadastro de Funcionários em Massa**
    * **Objetivo:** Validar a criação de 3 novos registros utilizando dados de `fixtures/users.json`.
    * **Resultado esperado:** Mensagem "Successfully Saved" para cada registro.
* **CT-05: Exclusão de Registros Específicos**
    * **Objetivo:** Localizar funcionários via busca e realizar a exclusão.
    * **Resultado esperado:** Tabela atualizada sem os registros removidos.
* **CT-06: Edição de Dados Cadastrais**
    * **Objetivo:** Alterar Nome, ID e Gênero de um funcionário existente.
    * **Resultado esperado:** Dados persistidos com sucesso após a atualização.

## ⚙️ Como Instalar e Rodar
Siga os passos abaixo para configurar o ambiente e executar os testes:

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### 2. Instalação
No terminal, dentro da pasta do projeto, execute o comando abaixo:
```bash
npm install
```
### 3. Execução
Modo Interativo (Interface): `npx cypress open`

Modo Headless (Relatórios): `npx cypress run`

### 📊 Evidências
O relatório de execução (HTML) é gerado automaticamente após o comando npx cypress run e pode ser encontrado em: cypress/reports/index.html
