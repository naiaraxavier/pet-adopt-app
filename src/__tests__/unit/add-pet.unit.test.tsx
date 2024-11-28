import React from "react";
import {
  render,
  waitFor,
  screen,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react-native";
import FormScreen from "@/src/app/stack/form-add-pets";
import toast from "react-native-toast-message";

// Mock da navegação
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock do Firebase
jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(),
    getApp: jest.fn(),
    getApps: jest.fn().mockReturnValue([]),
  };
});

// Mock do Firebase Auth
jest.mock("firebase/auth", () => {
  return {
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
  };
});

// Mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
}));

// Mock do Firebase Firestore
jest.mock("@firebase/firestore", () => ({
  getDocs: jest.fn(() => Promise.resolve(mockSnapshot)),
  addDoc: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
}));

// Mock do Firebase Storage
const mockSnapshot = {
  forEach: jest.fn((callback) => {
    const docs = [{ id: "1", data: () => ({ name: "Categoria 1" }) }];
    docs.forEach(callback);
  }),
};

// Mock do react-native-toast-message
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

describe("Form add PET Unit Tests", () => {
  afterEach(() => {
    cleanup();
  });

  // Teste para verificar se o componente FormScreen é renderizado corretamente
  it("should render correctly", async () => {
    render(<FormScreen />);
    await waitFor(() => screen.findByText("Adicionar novo PET"));
  });

  // Teste para verificar se o estado do nome do pet é atualizado
  it("must update the status of the pet's name", async () => {
    const { getByPlaceholderText } = render(<FormScreen />);
    const inputNome = getByPlaceholderText("Digite o nome do pet");
    fireEvent.changeText(inputNome, "Rex");

    await waitFor(() => {
      expect(inputNome.props.value).toBe("Rex");
    });
  });

  // Teste para verificar se ao não preencher os campos obrigatórios é exibido um erro
  it("should show an error if required fields are not filled", async () => {
    const { getByText } = render(<FormScreen />);

    fireEvent.press(getByText("Cadastrar Pet"));

    await waitFor(() => {
      expect(toast.show).toHaveBeenCalledWith({
        text1: "Erro",
        text2: "Por favor, preencha todos os campos obrigatórios",
        type: "error",
      });
    });
  });
});
