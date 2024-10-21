# site-empresa-api

Projeto de apresentação utilizando Node, Express, GraphQL, Sequelize e MySQL.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Exemplos de Consultas e Mutações](#exemplos-de-consultas-e-mutações)

## Instalação

Para instalar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/fabnaka/site-empresa-api

2. Navegue até o diretório do projeto:
   ```bash
   cd site-empresa-api

3. Instale as dependências:
   ```bash
   npm install

4. Certifique-se de criar um banco de dados MySQL vazio, e especificar arquivo .env de acordo com o arquivo .env.example:
   ```bash
   DB_NAME=empresa
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=123456
   DB_PORT=3306
   PORT=3800

## Uso

Para executar o projeto, utilize o seguinte comando:

1. Para executar o projeto, utilize o seguinte comando:
   ```bash
   npm run start

2. Ferramenta de Teste GraphQL
Você pode utilizar a ferramenta GraphQL Playground ou o Postman para testar suas consultas e mutações (por padr   ão, na URL http://localhost:4000/graphql)

## Exemplos de Consultas e Mutações 

Consultas
1. Obter todas as empresas:
   ```bash
   query ListarEmpresa {
      listarEmpresa {
         id
         nome
         telefone
         cnpj
         email
         endereco
      }
   }

2. Obter a empresa por ID:
   ```bash
   query BuscarEmpresaPorId {
      buscarEmpresaPorId(id: 1) {
         id
         nome
         cnpj
         endereco
         telefone
         email
      }
   }

Mutações

3. Adicionar uma empresa:
   ```bash
   mutation CriarAlterarEmpresa {
      criarAlterarEmpresa(data: {nome: "teste", cnpj: "11111111111", endereco: "teste", telefone: "123", email: "teste@gmail.com"}) {
         id
         nome
         cnpj
         endereco
         telefone
         email
      }
   }

4. Modificar uma empresa:
   ```bash
   mutation CriarAlterarEmpresa {
      criarAlterarEmpresa(data: {id: 2, nome: "teste2"}) {
         id
         nome
         cnpj
         endereco
         telefone
         email
      }
   }

5. Excluir uma empresa:
   ```bash
   mutation CriarAlterarEmpresa {
      criarAlterarEmpresa(data: {id: 1, ativo: "N"}) {
         id
         nome
         cnpj
         endereco
         telefone
         email
      }
   }
