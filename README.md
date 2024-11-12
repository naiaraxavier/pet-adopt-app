# 🐾 App para Adoção e Animais Perdidos

Este é um projeto em **React Native** voltado para ajudar pessoas a encontrar animais perdidos ou adotar novos amigos. A aplicação permite que usuários registrem animais perdidos, encontrem animais para adoção, e interajam com outros usuários interessados em ajudar.

## 📋 Funcionalidades

- **Cadastro de Animais Perdidos**: Adicione informações sobre o animal perdido, como foto, localização, e descrição.
- **Busca por Animais Perdidos**: Encontre animais desaparecidos por filtros de localização e descrição.
- **Adoção**: Visualize animais disponíveis para adoção, com detalhes e fotos.

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) - Framework para desenvolvimento mobile
- [Expo](https://expo.dev/) - Plataforma para desenvolvimento, construção e deploy de apps em React Native
- [React Navigation](https://reactnavigation.org/) - Navegação entre telas
- [Firebase](https://firebase.google.com/) - Autenticação e banco de dados em tempo real
- [Axios](https://axios-http.com/) - Para requisições HTTP
- [NativeWind](https://www.nativewind.dev/) - Biblioteca para estilização de componentes usando classes de utilitários semelhantes ao Tailwind CSS

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Um emulador iOS ou Android ou um dispositivo físico com o [Expo Go](https://expo.dev/client) instalado

Além disso, é recomendável ter um editor para trabalhar com o código, como o [Visual Studio Code](https://code.visualstudio.com/).

## 📦 Instalação

1. **Clone o repositório**

```bash
  git clone git@github.com:naiaraxavier/pet-adopt-app.git
```

2. **Navegue até o diretório do projeto**

```bash
  cd pet-adopt-app
```

3. **Instale as dependências**

```bash
  npm install
```

4. **Configure o Firebase**

Crie um projeto no Firebase e obtenha as credenciais. Depois, crie um arquivo .env na raiz do projeto e configure as variáveis do Firebase:

```plaintext
FIREBASE_APP_ID=your-app-id
FIREBASE_API_KEY=your-api-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
```

## 🏃 Executando o Projeto

1. **Inicie o servidor**

```bash
  npx expo start
```

2. **Inicie o servidor**

- Escaneie o QR code com o aplicativo Expo Go no seu dispositivo físico, ou
- Escolha rodar em um emulador iOS ou Android no menu que será exibido.

## 🚧 Melhorias Futuras

- Implementar sistema de mensagens entre usuários
- Notificações push para novos alertas de animais perdidos
- Opção de doação para ajuda em cuidados com os animais
