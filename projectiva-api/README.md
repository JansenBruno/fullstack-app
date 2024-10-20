# Projectiva api

## Documentação e Considerações 

- Estrutura do Backend
  - ✅ Implementação do backend com noções básicas de segurança e lógica de desenvolvimento.
- Sistema de Autenticação e Autorização
  - ✅ Implementação de sistema de autenticação utilizando JWT (JSON Web Token).
  - ✅ Proteção das rotas de gerenciamento de tarefas para garantir que apenas usuários autenticados possam acessá-las.
- Gerenciamento de Usuários
  - ✅ Funcionalidade de criação de usuários com perfis de:
  Gerente
  Funcionário
- Gerenciamento de SQUADS
 - ✅ Funcionalidade de criação de SQUADS, permitindo que usuários do tipo Gerente:
 - ✅ Criem SQUADS
 - ✅ Editem SQUADS
 - ✅ Excluam SQUADS
 - ✅ Funcionalidade de gerenciamento de SQUADS, permitindo que usuários do tipo Gerente adicionem usuários do tipo Funcionários aos SQUADS.

6. Gerenciamento de Tarefas
 - ✅ Implementação de operações CRUD para gerenciamento das tarefas que serão consumidas pelo front-end.
 - ✅  Endpoints para:
 - ✅  Criação de tarefas
 - ✅  Leitura de tarefas
 - ✅  Atualização de tarefas
 - ✅  Exclusão de tarefas
 - ✅  Endpoints para registro de usuários.


## Descrição

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Clonando o Repositório

Para começar, clone o repositório:

```bash
git clone <URL do repositório>
cd projectiva-app
```

## Instalação de Dependências

Instale as dependências do projeto utilizando npm:

```bash
npm install
```

## Configuração do Prisma

1. Abra o arquivo `prisma/schema.prisma` e configure-o para conectar ao banco de dados SQLite. Um exemplo básico de configuração seria:

```
O modelo de schema utilizado esta ./prisma/schema.prisma
```
2. crie o arquivo .env 

```
DATABASE_URL="file:./sqlite.db" # URL do banco de dados
JWT_SECRET="seu_segredo_aqui" # Segredo para JWT

```

3. Crie o banco de dados e o cliente Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma migrate deploy

```

 Ou para rodar o banco já com as migrations disponiveis 

 ```bash
npx prisma migrate deploy
```

## Build da Aplicação

Para construir sua aplicação, execute:

```bash
npm run build
```

## Executando a Aplicação

Inicie a aplicação em modo de produção:

```bash
npm run start:prod
```

Para modo de desenvolvimento, use:

```bash
npm run start:dev
```
