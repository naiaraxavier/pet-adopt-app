"use client";

// * React Native
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";

// * Data
import pets from "@/src/data/pets-data/pets/pets.json";

// * Components
import { useFavorites } from "@/src/data/hooks/useFavorites";
import { PetListItem } from "@/src/components/home/pet-list-item";

// * Interfaces
interface IFavorites {
  id: number;
  age: number;
  sex: string;
  name: string;
  image: string;
  weight: string;
  isLost: boolean;
  category: string;
  location: string;
  description: string;
  isAdoption: boolean;
}

const FavoritesPage = () => {
  const [favoritePets, setFavoritePets] = useState<Array<IFavorites>>([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    const favoritePetsData = pets.filter((pet) =>
      favorites.includes(pet.id.toString())
    );
    setFavoritePets(favoritePetsData);
  }, [favorites]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4 mt-10">
        <Text className="text-2xl font-bold mb-5">Meus Favoritos</Text>
        {favoritePets.length > 0 ? (
          <FlatList
            data={favoritePets}
            renderItem={({ item }) => <PetListItem pet={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            className="w-full"
          />
        ) : (
          <Text className="text-center text-gray-500">
            Você ainda não tem pets favoritos.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesPage;
