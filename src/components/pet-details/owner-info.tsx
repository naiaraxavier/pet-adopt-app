import { View, Text, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface OwnerInfoProps {
  pet: {
    user: { name: string; email: string; imageUrl: string };
  };
}

export default function OwnerInfo({ pet }: OwnerInfoProps) {
  return (
    <View className="p-5  flex flex-row gap-2 items-center ">
      <View className="flex pr-6 flex-row items-center justify-between border border-gray-300 rounded w-full p-2">
        <View className="flex flex-row gap-2 items-center">
          <Image
            className="w-16 h-16 rounded-full"
            source={{ uri: pet?.user.imageUrl }}
          />

          <View>
            <Text className="text-lg font-semibold">{pet?.user.name}</Text>
            <Text className="text-gray-400">{pet?.user.email}</Text>
          </View>
        </View>
        <FontAwesome name="send" size={24} color="black" />
      </View>
    </View>
  );
}
