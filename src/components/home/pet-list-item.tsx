import { useFavorites } from "@/src/data/hooks/useFavorites";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface PetListItemProps {
  pet: any;
}

export const PetListItem = ({ pet }: PetListItemProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoritePress = async () => {
    toggleFavorite(pet?.id.toString());
  };

  return (
    <View
      testID="pet-card"
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
    </View>
  );
};
