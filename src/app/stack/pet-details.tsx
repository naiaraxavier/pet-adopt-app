import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import PetInfo from "@/src/components/pet-details/pet-info";

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

        {/* Pet Description */}

        {/* Pet Owner */}

        {/* Adopt Button */}
      </View>
    </View>
  );
};
