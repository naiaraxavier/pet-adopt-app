"use client";

// * React Native
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";

// * Data
import { db } from "@/firebase.config";
import { collection, getDocs } from "@firebase/firestore";

// * Components
import { useFavorites } from "@/src/data/hooks/useFavorites";
import { PetListItem } from "@/src/components/home/pet-list-item";

// * Interfaces
interface IFavorites {
  id: string;
  age: number;
  sex: string;
  name: string;
  weight: string;
  status: string;
  imageUrl: string;
  category: string;
  location: string;
  description: string;
  user?: [name: string, email: string, imageUrl: string];
}

const FavoritesPage = () => {
  const [favoritePets, setFavoritePets] = useState<Array<IFavorites>>([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    const getPets = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Pets"));
        const petsList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            age: data.age,
            sex: data.sex,
            breed: data.breed,
            name: data.name,
            imageUrl: data.imageUrl,
            weight: data.weight,
            status: data.status,
            category: data.category,
            location: data.location,
            description: data.description,
          };
        });

        setFavoritePets(petsList.filter((pet) => favorites.includes(pet.id)));
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    getPets();
  }, [favorites]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4 mt-10">
        <Text className="text-2xl font-bold mb-5">Meus Favoritos</Text>
        {favoritePets.length > 0 ? (
          <FlatList
            data={favoritePets}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PetListItem pet={item} />}
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
