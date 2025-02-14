Feature: Central de Atendimento ao Cliente TAT

  Scenario: Verifica o título da aplicação
    Given Eu acesso a página inicial
    Then verifica o título da aplicação

Scenario: Enviar formulário com sucesso
    Given que estou na página inicial da Central de Atendimento ao Cliente TAT
    When preencho os campos obrigatórios e envio o formulário
    Then a mensagem de sucesso deve ser exibida


  Scenario: Exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida

    Given que estou na página inicial da Central de Atendimento ao Cliente TAT
    When preencho o formulário com um e-mail com formatação inválida
    And envio o formulário
    Then a mensagem de erro deve ser exibida
    And a mensagem de erro deve ser ocultada após 3 segundos


  Scenario: Campo telefone continua vazio quando preenchido com um valor não-numérico
    Given que eu esteja na página de formulário
    When eu preencher o campo de telefone com "abcde"
    Then o campo de telefone deve permanecer vazio

 Scenario: Preencher e limpar os campos nome, sobrenome, email, telefone e mensagem
    Given que eu esteja na página de formulário do Cat
    When  prencho os campos
    Then  deve limpar todos campos
    


