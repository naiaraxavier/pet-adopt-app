import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favoritePets');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

export const handleFavorite = async (
  id: number,
  favoritePets: number[],
  setFavoritePets: React.Dispatch<React.SetStateAction<number[]>>
) => {
  let updatedFavorites = [...favoritePets];

  if (updatedFavorites.includes(id)) {
    updatedFavorites = updatedFavorites.filter((petId) => petId !== id);
  } else {
    updatedFavorites.push(id);
  }

  setFavoritePets(updatedFavorites);
  await AsyncStorage.setItem('favoritePets', JSON.stringify(updatedFavorites)); // Salva no AsyncStorage
  return updatedFavorites;
};
