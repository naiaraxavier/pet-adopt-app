// * React Native
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// * Helpers
import { getSession } from '@/src/data/helpers/storage';

// * Components
import Loading from '@/src/components/loading';
import { CategoryButton } from '@/src/components/category';
import { CarouselHome } from '@/src/components/carousel';

// * Data
import { PetCard } from '@/src/components/pert-card';

import pets from '@/src/data/pets-data/pets/pets.json';
import { getFavorites, handleFavorite } from '@/src/data/helpers/ultils';

const Home = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [favoritePets, setFavoritePets] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = ['Gatos', 'Cães', 'Pássaros', 'Peixes', 'Roedores'];

  useEffect(() => {
    const fetchSessionData = async () => {
      const { email } = await getSession();
      setUserEmail(email ?? 'Usuário');
      setLoading(false);

      const storedFavorites = await getFavorites();
      setFavoritePets(storedFavorites);
    };
    fetchSessionData();
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-white w-full'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Greeting and Banner */}
          <View className='bg-[#f6d6c0ee] pb-7 shadow'>
            <Text className='font-bold mb-3 mt-12 pl-4'>Olá, {userEmail}!</Text>

            <View className='h-[240px] w-full'>
              <CarouselHome />
            </View>
          </View>

          {/* Categories */}
          <View className='px-5'>
            <View className='flex-row justify-between items-center'>
              <Text className='font-bold mb-6 mt-6'>Categorias</Text>

              <TouchableOpacity onPress={() => navigation.navigate('#')}>
                <Text className='text-[#F7924A] underline'>Ver tudo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row gap-6'>
                {categories.map((category, index) => (
                  <CategoryButton
                    key={index}
                    category={category}
                    isSelected={category === selectedCategory}
                    onPress={() => setSelectedCategory(category)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Close to you */}
          <View className='px-5'>
            <View className='flex-row justify-between items-center'>
              <Text className='font-bold mb-6 mt-6'>Próximos a você</Text>

              <TouchableOpacity onPress={() => navigation.navigate('#')}>
                <Text className='text-[#F7924A] underline'>Ver tudo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row gap-6'>
                {pets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    name={pet.name}
                    image={pet.image}
                    location={pet.location}
                    isLost={pet.isLost}
                    isAdoption={pet.isAdoption}
                    isFavorite={favoritePets.includes(pet.id)}
                    onFavorite={() =>
                      handleFavorite(pet.id, favoritePets, setFavoritePets)
                    }
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Button add PET */}
          <View className='px-8 items-center mt-10'>
            <TouchableOpacity
              className='bg-[#697F89] p-5 rounded-full w-full'
              onPress={() => {}}
            >
              <Text className='text-white font-bold text-center text-lg'>
                Adicionar um novo PET
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
