import { Ionicons } from "@expo/vector-icons";
import { About } from "@/src/components/pet-details/about";
import PetInfo from "@/src/components/pet-details/pet-info";
import { View, TouchableOpacity, Text } from "react-native";
import OwnerInfo from "@/src/components/pet-details/owner-info";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PetSubInfo } from "@/src/components/pet-details/pet-sub-info";

export const PetDetails = () => {
  const route = useRoute<any>();
  const { pet } = route.params;
  const navigation = useNavigation();

  return (
    <View className="bg-white flex-1">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-4 z-10  bg-white p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="#F7924A" />
      </TouchableOpacity>

      <View className="">
        {/* Pet Info */}
        <PetInfo pet={pet} />

        {/* Pet Properties */}
        <PetSubInfo pet={pet} />

        {/* Pet Description */}
        <About pet={pet} />

        {/* Pet Owner */}
        <OwnerInfo pet={pet} />
      </View>

      {/* Adopt Button */}
      <TouchableOpacity className="absolute bottom-6 w-full">
        <View className=" bg-[#F7924A] p-5 rounded-full items-center justify-center mx-5">
          <Text className=" text-lg font-semibold">
            {pet?.status === "Perdido" ? "Encontrar" : "Adotar"} {pet?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
