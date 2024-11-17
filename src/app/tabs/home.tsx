// * React Native
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

// * Firebase
import { FIREBASE_AUTH } from "@/firebase.config";

// * Data
import pets from "@/src/data/pets-data/pets/pets.json";

// * Components
import Loading from "@/src/components/loading";
import { PetCard } from "@/src/components/pert-card";
import { CarouselHome } from "@/src/components/carousel";
import { CategoryButton } from "@/src/components/category";
import { AddPetButton } from "@/src/components/add-pet-button";
import { Header } from "@/src/components/home/header";
import { Slider } from "@/src/components/home/slider";
import { PetListByCategory } from "@/src/components/home/pet-list-by-category";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = ["Gatos", "Cães", "Pássaros", "Peixes", "Roedores"];

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUserEmail(user && user.email ? user.email : "Usuário");
    });
    // const removeValue = async () => {
    //   try {
    //     await AsyncStorage.removeItem("favorites");
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
    // removeValue();

    setLoading(false);
    return subscriber;
  }, [auth]);

  return (
    <View className="flex-1 bg-white w-full">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Header */}
          <View className="p-5 mt-5">
            <Header />

            {/* Slider */}
            <Slider />

            {/* Categories */}
            <PetListByCategory />
          </View>

          {/* Greeting and Banner */}
          {/* <View className="bg-[#f6d6c0ee] pb-7 shadow">
            <Text className="font-bold mb-3 mt-12 pl-4">Olá, {userEmail}!</Text>

            <View className="h-[240px] w-full">
              <CarouselHome />
            </View>
          </View> */}

          {/* Categories */}
          {/* <View className="px-5">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold mb-6 mt-6">Categorias</Text>

              <TouchableOpacity onPress={() => navigation.navigate("#")}>
                <Text className="text-[#F7924A] underline">Ver tudo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-6">
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
          </View> */}

          {/* Close to you */}
          {/* <View className="px-5">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold mb-6 mt-6">Próximos a você</Text>

              <TouchableOpacity onPress={() => navigation.navigate("#")}>
                <Text className="text-[#F7924A] underline">Ver tudo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-6">
                {pets.map((pet) => (
                  <PetCard
                    id={pet.id}
                    key={pet.id}
                    name={pet.name}
                    image={pet.image}
                    location={pet.location}
                    isLost={pet.isLost}
                    isAdoption={pet.isAdoption}
                  />
                ))}
              </View>
            </ScrollView>
          </View> */}

          {/* Button add PET */}
          {/* <AddPetButton /> */}
        </>
      )}
    </View>
  );
};

export default Home;
