'use client';

// * React Native
import { View, Image, Text, TouchableOpacity } from 'react-native';

// * Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// * Hooks
import { useFavorites } from '../data/hooks/useFavorites';

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
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoritePress = async () => {
    toggleFavorite(id.toString());
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
          name={isFavorite(id.toString()) ? 'heart' : 'heart-o'}
          color={isFavorite(id.toString()) ? 'red' : 'red'}
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
