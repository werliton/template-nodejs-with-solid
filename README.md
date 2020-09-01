# Template API Nodejs with SOLID


## O que temos:
- Configuração com eslint, editorconfig
- Configuração com Debug

## Comando iniciais

```
yarn add
    - express, @types/express -D
    - typescript -D
    - ts-node-dev -D
    - date-fns
yarn tsc --init

> Realizar uma migracao:
- yarn typeorm migration:run


> Criando uma migracao:
- yarn typeorm migration:create -n nomedamigration

> Revertendo uma migracao:
- yarn typeorm migration:revert (Reverte a última migration realizada)

```

## Estrutura do projeto


```
src/
├── server.ts (arquivos inicial que chama as rotas)
├── @types/ (Definição de tipos)
├── config/ (Contem valores estaticos de configurações )
├── errors/ (Contem o errohandler global)
├── middlewares/ (Contem todas as rotinas intermediárias nas rotas)
├── routes/ (Contém todas as rotas da aplicacao e transformação de dados)
├── repositories/ (Contem toda a manipulação dos dados | ponte entre a aplicação e a fonte de dados)
├── models/ (Contém todos as entidades/modelos da aplicação)
├── services/ (Contem toda a regra de negócio)
└── database/ (Contem toda a configuracao com a base de dados Postgres)
│   └── migrations/ (Contem todas as migrations da base)

```

## Como rodar o projeto

### 1º Passo

Deve deixar a base de dados no Postgres disponível. Para isso, temos duas opções:

1- Disponibilizar um container no docker rodando o comando:

```
docker run --name gostack-postgres -e POSTGRES_PASSWORD=123456 -p 5434:5432 -d postgres
```
2- Executar via `docker-compose`:

```
docker-compose up -d --build
```
## Stack

- Nodejs
- Express
- Typescript
- TypeORM
- Postgres
