# Recuperacao de Senha

**RF(Requisitos Funcionais)**

- O usuario deve poder recuperar sua senha informando o seu e-mail;
- O usuario deve receber um e-mail com instrucoes de recuperacao de senha;
- O usuario deve poder resetar sua senha.

**RNF(Requisitos nao Funcionais)**

- Utilizar Mailtrap para testar envios de e-mails em desenvolvimento;
- Utilizar AmazonSES para envios em producao;
- O envio de e-mails deve acontencer em segundo plano (background djob)

**RN(Regra de Negocio)**

- O link enviado por e-mail para resetar a senha, deve expirar em duas horas;
- O usuario precisa confirmar a nova senha ao resetar a sua senha;

# Atualizacao do perfil

**RF**

- O usuario deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuario nao pode alterar seu e-mail um e-mail ja em uso;
- Para atualizar a sua senha o usuario deve informar a senha antiga;
- Para atualizar sua senha o usuario precisa confirmar a sua senha;


# Painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve poder receber uma notificacao sempre que houver um novo agendamento;
- O prestador deve poder visualizar notificacoes nao litas.

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em cache;
- As notificacoes do prestador devem ser armazendas no mongoDB;
- As notificacoes do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar.

# Agendamento de servicos

**RF**

- o usuario deve poder listar a lista todos prestadores de servico cadastrados;
- o usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador'
- o usuario deve poder listar os horarios disponiveis de um dia especifico de um prestador;
- o usuario deve poder realizar um novo agendamento com um prestador.

**RNF**

- a listagem de prestadores deve ser armazenda em cache;

**RN**

- cada agendamento deve durar 1h;
- Os agenaemntos deve estar disponiveis entre 8h as 18h (primeiro as 8h e ultimo as 17h);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario nao pode agendar em um horarrio que ja passou;
- O usuario nao pode agendar servicos consigo mesmo.
