import { View, Image, Text } from "react-native";

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
    </View>
  );
}
