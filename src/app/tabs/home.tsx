// * React Native
import { View, TouchableOpacity, Text } from "react-native";

// * Components
import { Header } from "@/src/components/home/header";
import { Slider } from "@/src/components/home/slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { PetListByCategory } from "@/src/components/home/pet-list-by-category";

const Home = () => {
  return (
    <View className="flex-1 bg-white w-full">
      {/* Header */}
      <View className="p-5 h-full mt-5">
        <Header />

        {/* Slider */}
        <Slider />

        {/* Categories */}
        <PetListByCategory />

        {/* Add New Pet Option */}
        <TouchableOpacity className="absolute bottom-8 left-5 right-5 flex flex-row gap-3 p-5 rounded-full justify-center items-center bg-gray-600">
          <MaterialIcons name="pets" size={22} color="#FBD2B6" />
          <Text className="font-bold text-lg text-center text-white">
            Adicionar um Novo Pet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
