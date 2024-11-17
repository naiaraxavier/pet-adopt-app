// import React from "react";
// import Auth from "../../app/stack/auth";
// import { render, fireEvent, waitFor } from "@testing-library/react-native";

// // Mocks
// jest.mock("@react-navigation/native", () => ({
//   useNavigation: () => ({
//     navigate: jest.fn(),
//   }),
// }));

// jest.mock("expo-router", () => ({
//   useRouter: jest.fn(() => ({
//     push: jest.fn(),
//   })),
// }));

// jest.mock("firebase/auth", () => ({
//   signInWithEmailAndPassword: jest.fn(),
//   createUserWithEmailAndPassword: jest.fn(),
// }));

// jest.mock("../../../firebase.config", () => ({
//   FIREBASE_AUTH: {},
// }));

// jest.mock("react-native-toast-message", () => ({
//   show: jest.fn(),
// }));

// // Mock AsyncStorage
// jest.mock("@react-native-async-storage/async-storage", () => ({
//   setItem: jest.fn(),
//   getItem: jest.fn(),
//   removeItem: jest.fn(),
// }));

// // Mock useFavorites hook
// jest.mock("../../data/hooks/useFavorites", () => ({
//   useFavorites: jest.fn(() => ({
//     favorites: [],
//     addFavorite: jest.fn(),
//     removeFavorite: jest.fn(),
//   })),
// }));

// import { useRouter } from "expo-router";

// describe("Auth Component", () => {
//   // Teste para verificar se o componente Auth é renderizado corretamente
//   it("renders correctly", () => {
//     const { getByText, getByPlaceholderText } = render(<Auth />);
//     expect(getByText("Ache seu Amigo!")).toBeTruthy();
//     expect(getByPlaceholderText("E-mail")).toBeTruthy();
//     expect(getByPlaceholderText("Senha")).toBeTruthy();
//     expect(getByText("Entrar")).toBeTruthy();
//   });

//   // Teste para verificar se o componente alterna entre os modos de login e cadastro
//   it("switches between login and signup modes", () => {
//     const { getByText } = render(<Auth />);
//     fireEvent.press(getByText("Ainda não tem uma conta? Crie uma!"));
//     expect(getByText("Crie sua conta")).toBeTruthy();
//     expect(getByText("Criar conta")).toBeTruthy();
//     fireEvent.press(getByText("Já tem uma conta? Faça login!"));
//     expect(getByText("Ache seu Amigo!")).toBeTruthy();
//     expect(getByText("Entrar")).toBeTruthy();
//   });

//   // Teste para verificar se uma mensagem de erro é exibida para e-mail inválido
//   it("shows error message for invalid email", async () => {
//     const { getByPlaceholderText, getByText } = render(<Auth />);
//     fireEvent.changeText(getByPlaceholderText("E-mail"), "invalid-email");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "password123");
//     fireEvent.press(getByText("Entrar"));
//     await waitFor(() => {
//       expect(getByText("Por favor, insira um e-mail válido.")).toBeTruthy();
//     });
//   });

//   // Teste para verificar se uma mensagem de erro é exibida para senha curta
//   it("shows error message for short password", async () => {
//     const { getByPlaceholderText, getByText } = render(<Auth />);
//     fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "123");
//     fireEvent.press(getByText("Entrar"));
//     await waitFor(() => {
//       expect(
//         getByText("A senha deve ter pelo menos 6 caracteres.")
//       ).toBeTruthy();
//     });
//   });

//   // Teste para verificar se a função signInWithEmailAndPassword é chamada no login
//   it("calls signInWithEmailAndPassword on login", async () => {
//     const { getByPlaceholderText, getByText } = render(<Auth />);
//     fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "password123");
//     fireEvent.press(getByText("Entrar"));
//     await waitFor(() => {
//       expect(
//         require("firebase/auth").signInWithEmailAndPassword
//       ).toHaveBeenCalled();
//     });
//   });

//   // Teste para verificar se a função createUserWithEmailAndPassword é chamada no cadastro
//   it("calls createUserWithEmailAndPassword on signup", async () => {
//     const { getByPlaceholderText, getByText } = render(<Auth />);
//     fireEvent.press(getByText("Ainda não tem uma conta? Crie uma!"));
//     fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "password123");
//     fireEvent.press(getByText("Criar conta"));
//     await waitFor(() => {
//       expect(
//         require("firebase/auth").createUserWithEmailAndPassword
//       ).toHaveBeenCalled();
//     });
//   });

//   //Teste para verificar se uma mensagem de erro é exibida ao tentar criar uma conta com um e-mail já existente
//   it("shows error message for existing email", async () => {
//     const { getByPlaceholderText, getByText, findByText } = render(<Auth />);
//     fireEvent.press(getByText("Ainda não tem uma conta? Crie uma!"));
//     fireEvent.changeText(getByPlaceholderText("E-mail"), "naiaraxf@gmail.com");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "password123");
//     fireEvent.press(getByText("Criar conta"));

//     await waitFor(() => {
//       expect(
//         findByText("Email ou senha incorreta. Tente novamente.")
//       ).resolves.toBeTruthy();
//     });
//   });

//   it("navigates to the home screen on successful login", async () => {
//     const mockPush = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

//     const { getByPlaceholderText, getByText, findByText } = render(<Auth />);

//     fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
//     fireEvent.changeText(getByPlaceholderText("Senha"), "password123");

//     fireEvent.press(getByText("Entrar"));

//     await waitFor(() => {
//       expect(findByText("Logado com sucesso!")).resolves.toBeTruthy();
//     });
//   });
// });
