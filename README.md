Este é o resultado da utilização das técnicas de refactoring aprendidas durante a primeira aula do curso Clean Code e Clean Architecture da Branas.io

UC1 - Signup

Ator: Passageiro, Motorista

Input: name, email, cpf, carPlate, password, isPassenger, isDriver

Output: account_id

- deve verificar se o email já existe e lançar um erro caso já exista

- deve gerar o account_id (uuid)

- deve validar o nome, email e cpf

- deve apenas salvar a senha, por enquanto em claro

Para testar adequadamente o UC1 será necessário criar o UC2 - GetAccount.

UC2 - GetAccount

Input: account_id

Output: todas as informações da conta

Observações:

Crie uma API REST para interagir com os use cases criados por meio do protocolo HTTP e não se esqueça de também criar testes para a API.

Para mais informações acesse:

https://branas.io
