import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import FavoritesPage from "../../app/tabs/favorites";
import { useFavorites } from "@/src/data/hooks/useFavorites";
import pets from "@/src/data/pets-data/pets/pets.json";

// Mock the useFavorites hook
jest.mock("@/src/data/hooks/useFavorites");

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("FavoritesPage", () => {
  it("renders correctly when there are favorite pets", async () => {
    // Mock the favorites returned by the hook
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: ["1", "2"],
      isFavorite: jest.fn().mockImplementation((id) => ["1", "2"].includes(id)),
    });

    const { getByText, getAllByTestId } = render(<FavoritesPage />);

    await waitFor(() => {
      expect(getByText("Meus Favoritos")).toBeTruthy();
      expect(getAllByTestId("pet-card").length).toBe(2);
    });
  });

  it("renders correctly when there are no favorite pets", async () => {
    // Mock the favorites returned by the hook
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      isFavorite: jest.fn().mockReturnValue(false),
    });

    const { getByText } = render(<FavoritesPage />);

    await waitFor(() => {
      expect(getByText("Meus Favoritos")).toBeTruthy();
      expect(getByText("Você ainda não tem pets favoritos.")).toBeTruthy();
    });
  });
});
