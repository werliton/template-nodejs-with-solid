# Comando iniciais

```
yarn add
    - express, @types/express -D
    - typescript -D
    - ts-node-dev -D
    - date-fns
yarn tsc --init

```

## Estrutura do projeto

```
- src/
    - server.ts : arquivos inicial que chama as rotas
    - routes/ (Contém todas as rotas da aplicacao e transformação de dados)
    - repositories/ (Contem toda a manipulação dos dados | ponte entre a aplicação e a fonte de dados)
    - models/ (Contém todos as entidades/modelos da aplicação)
    - services/ (Contem toda a regra de negócio)
```
