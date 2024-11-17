import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from "../../data/hooks/useFavorites";
import { act, renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("useFavorites", () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
  });

  it("should load favorites from AsyncStorage on mount", async () => {
    const storedFavorites = JSON.stringify(["1", "2"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedFavorites);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["1", "2"]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("favorites");
    });
  });

  it("should toggle favorite correctly", async () => {
    const storedFavorites = JSON.stringify(["1"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedFavorites);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["1"]);
    });

    await act(async () => {
      result.current.toggleFavorite("2");
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["1", "2"]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "favorites",
        JSON.stringify(["1", "2"])
      );
    });

    await act(async () => {
      result.current.toggleFavorite("1");
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["2"]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "favorites",
        JSON.stringify(["2"])
      );
    });
  });

  it("should check if an item is favorite", async () => {
    const storedFavorites = JSON.stringify(["1"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedFavorites);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["1"]);
    });

    expect(result.current.isFavorite("1")).toBe(true);
    expect(result.current.isFavorite("2")).toBe(false);
  });
});
