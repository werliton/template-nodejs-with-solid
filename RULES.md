# Recuperacao de senha

**Requisitos Funcionais**

- O usuario deve:
    - recuperar sua senha informando o seu email;
    - receber um email com instrucoes de recuperacao de senha
    - poder redefinir sua senha.

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios de email em ambiente de dev;
- Utilizar Amazon SES para envios em producao;
- O envio de emails deve acontecer em segundo plano;

**Regras de negócio**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar sua senha

# Atualizacao do perfil

**Requisitos Funcionais**

- O usuario deve:
    - poder atualizar seu nome, email e senha.

**Regras de negócio**

- O usuario nao pode alterar seu email para um email ja utilizado;
- Para atualizar a senha o usuario deve:
    - informar a senha antiga;
    - confirmar a nova senha

# Painel do prestador

**Requisitos Funcionais**

- O usuario deve:
    - poder listar seus agendamentos de um dia especifico
- O prestador deve:
    - receber uma notificacao sempre que houver um novo agendamento
    - poder visualizar as notificacoes nao lidas


**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser cacheados;
- As notificacoes do prestador devem ser:
    - armazenadas no MongoDB;
    - enviadas em realtime utilizando Socket.io



**Regras de negócio**

- A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar

# Agendamento de serviços

**Requisitos Funcionais**

- O usuario deve poder:
    - listar todos prestadores de servico cadastrados;
    - listar os dias de um mes com pelo menos um horario disponivel de um prestador
    - listar horarios disponiveis em um dia especifico de um prestador
    - realizar um novo agendamento com um prestador

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache

**Regras de negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeiro as 8h, ultimo as 17h)
- O usuário nao pode agendar:
    - em um horario ja ocupado
    - em um horario que ja passou
    - servicos consigo mesmo
