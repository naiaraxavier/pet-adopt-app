// * Icons
import { FontAwesome, Ionicons } from "@expo/vector-icons";

// * React
import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

interface PetCardProps {
  name: string;
  image: string;
  isLost: boolean;
  location: string;
  isAdoption: boolean;
  onFavorite: () => void;
}

export const PetCard = ({
  name,
  image,
  isLost,
  location,
  onFavorite,
  isAdoption,
}: PetCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite();
  };

  return (
    <View className="bg-white p-4 rounded-2xl shadow-lg w-[170px]">
      {/* Image */}
      <Image
        source={{ uri: image }}
        className="w-full h-40 rounded-xl"
        resizeMode="cover"
      />

      <View className="mt-2">
        {/* Pet's name */}
        <Text className="font-bold">{name}</Text>

        {/* Location */}
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">{location}</Text>
        </View>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity
        onPress={handleFavorite}
        className="absolute top-4 right-4"
      >
        <FontAwesome
          size={20}
          name={isFavorited ? "heart" : "heart-o"}
          color={isFavorited ? "#F7924A" : "#F7924A"}
        />
      </TouchableOpacity>

      {/* Loss or Donation Flags */}
      <Text
        className={`absolute top-4 left-4 text-white p-1 rounded-md text-center
          ${isLost ? "bg-red-500" : "bg-green-500"}`}
      >
        {isLost ? "Perdido" : "Doação"}
      </Text>
    </View>
  );
};
