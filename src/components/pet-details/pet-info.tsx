import { useFavorites } from "@/src/data/hooks/useFavorites";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";

interface PetInfoProps {
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

export default function PetInfo({ pet }: PetInfoProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoritePress = () => {
    toggleFavorite(pet?.id.toString());
  };

  return (
    <View>
      <View>
        <Image
          source={{ uri: pet.imageUrl }}
          className="w-full h-96 object-cover"
        />
        <Text
          className={`absolute top-12 right-5 text-white text-xl font-semibold p-2 rounded-md text-center
          ${pet?.status === "Perdido" ? "bg-red-500" : "bg-green-500"}`}
        >
          {pet?.status}
        </Text>
      </View>
      <View className="p-5">
        <Text className="text-3xl font-semibold">{pet?.name}</Text>
        <Text className="text-lg text-gray-400">{pet?.location}</Text>

        <TouchableOpacity
          onPress={handleFavoritePress}
          className="absolute bottom-12 right-5"
        >
          <FontAwesome
            size={30}
            name={isFavorite(pet?.id.toString()) ? "heart" : "heart-o"}
            color={isFavorite(pet?.id.toString()) ? "red" : "red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
