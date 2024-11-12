import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import pets from '@/src/data/pets-data/pets/pets.json';
import { getFavorites, handleFavorite } from '@/src/data/helpers/ultils';
import { PetCard } from '@/src/components/pert-card';

const Favorites = () => {
  const [favoritePets, setFavoritePets] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites();
      const petsInFavorites = pets.filter((pet) =>
        storedFavorites.includes(pet.id)
      );
      setFavoritePets(petsInFavorites);
    };
    fetchFavorites();
  }, []);

  return (
    <View className='flex-1 bg-white'>
      <View className='px-5 mt-10'>
        <Text className='font-bold mb-6 mt-6 text-3xl'>Meus Favoritos</Text>

        {favoritePets.length === 0 ? (
          <Text className='text-center'>
            Você ainda não favoritou nenhum pet.
          </Text>
        ) : (
          <ScrollView>
            <View className='flex-row gap-6'>
              {favoritePets.map((pet) => (
                <PetCard
                  key={pet.id}
                  name={pet.name}
                  image={pet.image}
                  location={pet.location}
                  isLost={pet.isLost}
                  isAdoption={pet.isAdoption}
                  isFavorite={true}
                  onFavorite={() =>
                    handleFavorite(
                      pet.id,
                      favoritePets.map((p) => p.id),
                      setFavoritePets
                    )
                  }
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Favorites;
