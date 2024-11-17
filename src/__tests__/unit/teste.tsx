import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

describe("Ambiente de Teste React Native", () => {
  test("deve renderizar uma mensagem simples", () => {
    const { getByText } = render(
      <Text>Teste de ambiente está funcionando!</Text>
    );

    const message = getByText("Teste de ambiente está funcionando!");
    expect(message).toBeTruthy();
  });
});
