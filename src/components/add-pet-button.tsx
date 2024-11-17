import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export const AddPetButton = () => {
  const navigation = useNavigation<any>();

  const handleAddNewPet = () => {
    try {
      navigation.navigate("FormScreen");
    } catch (error) {
      console.error("Erro ao navegar:", error);
    }
  };

  return (
    <View className="px-8 items-center mt-10">
      <TouchableOpacity
        className="bg-[#697F89] p-5 rounded-full w-full"
        onPress={handleAddNewPet}
      >
        <Text className="text-white font-bold text-center text-lg">
          Adicionar um novo PET
        </Text>
      </TouchableOpacity>
    </View>
  );
};
