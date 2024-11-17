import { useFavorites } from "@/src/data/hooks/useFavorites";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface PetListItemProps {
  pet: {
    id: string;
    age: number;
    sex: string;
    name: string;
    weight: string;
    status: string;
    imageUrl: string;
    category: string;
    location: string;
    description: string;
    user?: [name: string, email: string, imageUrl: string];
  };
}

export const PetListItem = ({ pet }: PetListItemProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigation = useNavigation<any>();

  const handleFavoritePress = async () => {
    toggleFavorite(pet?.id.toString());
  };

  const navigateToDetails = () => {
    navigation.navigate("PetDetails", { pet });
  };

  return (
    <TouchableOpacity
      testID="pet-card"
      onPress={navigateToDetails}
      className="bg-white border-[0.5px] border-gray-300 border-1 px-2 mx-3 pb-4 pt-2 rounded-2xl shadow-lg w-[170px]"
    >
      <Image
        source={{ uri: pet?.imageUrl }}
        className="w-full h-40 rounded-xl"
        resizeMode="cover"
      />

      <View className="mt-2">
        <Text className="font-bold">{pet?.name}</Text>

        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={20} color="#6B7280" />
          <Text className="ml-2 text-gray-500">{pet?.location}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFavoritePress}
        className="absolute bottom-10 right-3"
      >
        <FontAwesome
          size={20}
          name={isFavorite(pet?.id.toString()) ? "heart" : "heart-o"}
          color={isFavorite(pet?.id.toString()) ? "red" : "red"}
        />
      </TouchableOpacity>

      <Text
        className={`absolute top-4 right-4 text-white p-1 rounded-md text-center
          ${pet?.status === "Perdido" ? "bg-red-500" : "bg-green-500"}`}
      >
        {pet?.status}
      </Text>
    </TouchableOpacity>
  );
};
