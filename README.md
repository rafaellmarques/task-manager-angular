# Desafio Técnico: Sistema de Gerenciamento de Tarefas

## Descrição

Você foi contratado para desenvolver um sistema de gerenciamento de tarefas utilizando o framework Angular. O sistema deve permitir que os usuários criem, visualizem, atualizem e excluam tarefas. Além disso, as tarefas devem poder ser marcadas como concluídas e filtradas com base em seu estado (pendente, concluída).

## Requisitos Funcionais

* CRUD de Tarefas: Os usuários devem poder criar, visualizar, atualizar e excluir suas tarefas.
* Marcação de Tarefas: Os usuários devem poder marcar as tarefas como concluídas ou pendentes.
* Filtragem de Tarefas: Os usuários devem poder filtrar as tarefas com base em seu estado (pendente, concluída).
* Interface Amigável: A interface do usuário deve ser limpa, intuitiva e responsiva.

## Requisitos Técnicos

* Utilize Angular para desenvolver a aplicação.
* Utilize componentes do Angular Material para criar a interface do usuário.
* Armazene os dados das tarefas em um serviço Angular, utilizando Observables para atualizações em tempo real.
* Utilize rotas para navegar entre as diferentes telas da aplicação.
* Utilize boas práticas de programação e organize o código de forma modular e reutilizável.

## Critérios de Avaliação

* Funcionalidade Completa: A aplicação deve atender a todos os requisitos funcionais especificados.
* Qualidade do Código: O código deve ser limpo, legível, modular e seguir as melhores práticas de desenvolvimento Angular.
* Interface do Usuário: A interface do usuário deve ser amigável, responsiva e seguir as diretrizes de design do Angular Material.
* Responsividade e Performance: A aplicação deve ser responsiva em diferentes dispositivos e apresentar um bom desempenho, mesmo com um grande volume de dados.

## Run Locally

Para executar o projeto localmente é necessário o Angular na versão 16 e o json-server para simular o endpoint das tarefas.

Instalação do Angular

```bash
  npm i -g @angular/cli
```

Instalação do json-server

```bash
  npm i -g json-server
```

Clone o projeto

```bash
  git clone https://github.com/rafaellmarques/task-manager-angular.git
```

Acesse a pasta do projeto

```bash
  cd task-manager-angular
```

Instale as dependencias

```bash
  npm install
```

```bash
  json-server db.json
```

caso você não queira instalar o json-server você executar utilizando o npx

```bash
  npx json-server db.json
```

Start the server

```bash
  npm run start
```
