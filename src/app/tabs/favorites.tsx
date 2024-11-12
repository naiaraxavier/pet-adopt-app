'use client';

// * React Native
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

// * Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// * Data
import pets from '@/src/data/pets-data/pets/pets.json';

// * Components
import { PetCard } from '@/src/components/pert-card';

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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites !== null) {
          const favoritesArray = JSON.parse(favorites);
          const favoritePetsData = pets.filter((pet) =>
            favoritesArray.includes(pet.id)
          );
          setFavoritePets(favoritePetsData);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='p-4 mt-10'>
        <Text className='text-2xl font-bold mb-5'>Meus Favoritos</Text>
        {favoritePets.length > 0 ? (
          <FlatList
            data={favoritePets}
            renderItem={({ item }) => <PetCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            className='w-full'
          />
        ) : (
          <Text className='text-center text-gray-500'>
            Você ainda não tem pets favoritos.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesPage;
