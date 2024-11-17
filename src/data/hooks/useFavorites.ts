// * React Native
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  console.log(favorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const newFavorites = favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id];

      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};
