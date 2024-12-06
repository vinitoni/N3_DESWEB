# **Aplicação - Sistema com Internacionalização**

Este projeto é uma aplicação web que inclui funcionalidades de login, cadastro, loja virtual e painel de controle. A aplicação suporta internacionalização (inglês e português), com troca de idioma via seletor do navegador (Google).

---

## **📋 Funcionalidades**

- **Login**
  - Login via **E-mail/Senha**, **Google** ou **GitHub**.
- **Cadastro**
  - Registro de novos usuários com nome, e-mail e senha.
- **Loja Virtual**
  - Visualização e adição de produtos ao carrinho.
  - Paginação para navegação entre produtos.
- **Painel de Controle**
  - Visualização de informações do usuário.
  - Para administradores, exibição de todos os usuários.

---

## **⚙️ Requisitos**

Certifique-se de ter os seguintes itens instalados no seu ambiente de desenvolvimento:

- **Node.js** (versão 16 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)

---

## **🚀 Como Rodar a Aplicação**

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-repositorio/sistema-internacionalizacao.git
   cd sistema-internacionalizacao

2. **Instale as Dependências Execute o comando abaixo para instalar todas as bibliotecas necessárias:**
    npm install

3. **Configuração do Firebase**

-  Crie um projeto no Firebase.
-  Ative os métodos de login: E-mail/Senha, Google e GitHub.
-  Configure o Firestore e crie a coleção users com os seguintes campos:
-  name (string): Nome do usuário.
-  email (string): E-mail do usuário.
-  isAdmin (boolean): Define se o usuário é administrador.
-  createdAt (timestamp): Data de criação do usuário.

4. **Inicie o Servidor**
    -  npm start
    -  Abra o navegador e acesse: http://localhost:3000

5. **Troca de Idioma**

- Para mudar o idioma, acesse as configurações do navegador (Google Chrome) e ajuste o idioma preferido para Português ou Inglês.

6.  **Acesso ao ADMIN**

Admin
E-mail: admin@test.com
Senha: Admin123

**OS DEMAIS ACESSOS PODEM SER CRIADOS QUE SERÃO CONFIGURADOS NO BANCO DE DADOS**
