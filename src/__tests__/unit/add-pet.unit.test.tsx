import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { useNavigation, NavigationContainer } from "@react-navigation/native";
import Home from "@/src/app/tabs/home";

// Mock do useNavigation para testar a navegação
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("Home", () => {
  it("deve renderizar corretamente", () => {
    const { getByText, getByTestId } = render(<Home />);

    // Verificar se o texto "Adicionar um Novo Pet" está presente
    expect(getByText("Adicionar um Novo Pet")).toBeTruthy();

    // Verificar se o ícone "pets" está presente
    expect(getByTestId("pets-icon")).toBeTruthy();
  });

  it("deve navegar para a tela de FormScreen ao pressionar o botão", () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });

    const { getByText } = render(<Home />);

    const button = getByText("Adicionar um Novo Pet");
    fireEvent.press(button);

    // Verificar se a navegação para "FormScreen" foi chamada
    expect(navigateMock).toHaveBeenCalledWith("FormScreen");
  });
});
