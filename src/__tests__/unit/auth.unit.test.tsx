import React from "react";
import Auth from "../../app/stack/auth";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

// Mocks
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("../../../firebase.config", () => ({
  FIREBASE_AUTH: {},
}));

describe("Auth Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = (component: React.ReactElement) => {
    return render(<NavigationContainer>{component}</NavigationContainer>);
  };

  // Teste para verificar se o componente Auth é renderizado corretamente
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation(<Auth />);
    expect(getByText("Ache seu Amigo!")).toBeTruthy();
    expect(getByPlaceholderText("E-mail")).toBeTruthy();
    expect(getByPlaceholderText("Senha")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
  });

  // Teste para verificar se o componente alterna entre os modos de login e cadastro
  it("switches between login and signup modes", () => {
    const { getByText } = renderWithNavigation(<Auth />);
    fireEvent.press(getByText("Ainda não tem uma conta? Crie uma!"));
    expect(getByText("Crie sua conta")).toBeTruthy();
    expect(getByText("Criar conta")).toBeTruthy();
    fireEvent.press(getByText("Já tem uma conta? Faça login!"));
    expect(getByText("Ache seu Amigo!")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
  });

  // Teste para verificar mensagem de erro para e-mail inválido
  it("shows error message for invalid email", async () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(<Auth />);
    fireEvent.changeText(getByPlaceholderText("E-mail"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("Senha"), "password123");
    fireEvent.press(getByText("Entrar"));
    await waitFor(() => {
      expect(getByText("Por favor, insira um e-mail válido.")).toBeTruthy();
    });
  });

  // Teste para verificar mensagem de erro para senha curta
  it("shows error message for short password", async () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(<Auth />);
    fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Senha"), "123");
    fireEvent.press(getByText("Entrar"));
    await waitFor(() => {
      expect(
        getByText("A senha deve ter pelo menos 6 caracteres.")
      ).toBeTruthy();
    });
  });
});
