'use client';

// * React Native
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

// * Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// * Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PetCardProps {
  id: number;
  name: string;
  image: string;
  isLost: boolean;
  location: string;
  isAdoption: boolean;
}

export const PetCard = ({
  id,
  name,
  image,
  isLost,
  location,
  isAdoption,
}: PetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites !== null) {
          const favoritesArray = JSON.parse(favorites);
          setIsFavorite(favoritesArray.includes(id));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  const handleFavoritePress = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter(
          (favId: string) => Number(favId) !== id
        );
      } else {
        favoritesArray.push(id);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <View className='bg-white border-[0.5px] border-gray-300 border-1 px-2 pb-4 pt-2 rounded-2xl shadow-lg w-[170px]'>
      <Image
        source={{ uri: image }}
        className='w-full h-40 rounded-xl'
        resizeMode='cover'
      />

      <View className='mt-2'>
        <Text className='font-bold'>{name}</Text>

        <View className='flex-row items-center mt-1'>
          <Ionicons name='location-outline' size={20} color='#6B7280' />
          <Text className='ml-2 text-gray-500'>{location}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFavoritePress}
        className='absolute bottom-10 right-3'
      >
        <FontAwesome
          size={20}
          name={isFavorite ? 'heart' : 'heart-o'}
          color={isFavorite ? 'red' : 'red'}
        />
      </TouchableOpacity>

      <Text
        className={`absolute top-4 right-4 text-white p-1 rounded-md text-center
          ${isLost ? 'bg-red-500' : 'bg-green-500'}`}
      >
        {isLost ? 'Perdido' : 'Doação'}
      </Text>
    </View>
  );
};
