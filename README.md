# Desafio Técnico – Sistema de Player de Mídias

Este projeto foi desenvolvido como parte de um desafio técnico para criar um sistema de player de mídias, composto por um back-end (API), um painel de administração web e um player web.

## Tecnologias Utilizadas

### Back-end (media-api)
* **Framework:** ASP.NET Core 8
* **Linguagem:** C#
* **Banco de Dados:** Entity Framework Core (SQLite)
* **Outros:** AutoMapper para mapeamento de objetos.

### Front-end (admin-web e player-web)
* **Framework:** React v18
* **Linguagem:** TypeScript
* **Gerenciamento de Estado:** Zustand (para estado global)
* **Interface de Usuário:** Ant Design
* **Roteamento:** React Router DOM
* **Requisições HTTP:** Axios
* **Build Tool:** Vite

## Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **SDK do .NET 8** e o **Node.js** instalados em sua máquina.

### Back-end
1.  Navegue até o diretório `media-api`.
2.  Restaure os pacotes NuGet:
    
    dotnet restore
    
3.  Aplique as migrations do banco de dados (o banco será criado automaticamente):

    dotnet ef database update
    
4.  Inicie o servidor:
    
    dotnet run
    
O back-end estará disponível em `http://localhost:5023`.

### Front-end (admin-web e player-web)
1.  Abra o terminal na pasta admin-web e, em seguida, em outro terminal, na pasta player-web.

2.  Instale as dependências:
    
    npm install
    
3.  Inicie a aplicação de administração:
    
    npm run dev
    
A aplicação estará disponível em `http://localhost:5173` e `http://localhost:5174`.


## Fases Concluídas

As seguintes fases do desafio técnico foram integralmente concluídas:

* **Fase 1 - CRUD de Mídias:** A API REST para gerenciar mídias e o painel de administração web para criar, listar, editar e excluir mídias. A interface utiliza cards responsivos.
* **Fase 2 - Playlists e Relacionamentos:** O sistema de gerenciamento de playlists permite a criação e organização de playlists, a adição/remoção de mídias a elas, e a definição de qual playlist está ativa para exibição no player. A interface utiliza cards responsivos e uma tela dedicada para gerenciamento de mídias por playlist.
* **Fase 3 - Player Web:** O player web foi implementado como um projeto separado, responsável apenas por reproduzir imagens e vídeos da playlist ativa. Ele possui controles de navegação e exibe as informações da mídia atual. A interface foi otimizada para ser responsiva.


## O que Eu Faria com Mais Tempo

Com mais tempo disponível, as seguintes melhorias seriam implementadas para elevar a qualidade e robustez da aplicação:

* **Autenticação e Autorização:** Implementaria um sistema de autenticação via **JWT (JSON Web Tokens)** para proteger os endpoints da API, garantindo que apenas usuários autorizados possam acessar o app de administração.
* **Testes Automatizados:** Adicionaria testes unitários e de integração para a API .NET.
* **Arquitetura e Refatoração:** Refatoraria a camada de serviço e repositório para utilizar uma abordagem mais genérica e reutilizável, o que diminuiria a duplicação de código e tornaria o projeto mais escalável.