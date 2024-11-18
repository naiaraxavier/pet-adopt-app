import { useState } from "react";
import { View, Text } from "react-native";

interface AboutProps {
  pet: {
    id: string;
    age: number;
    sex: string;
    name: string;
    weight: string;
    breed: string;
    status: string;
    imageUrl: string;
    category: string;
    location: string;
    description: string;
    user?: [name: string, email: string, imageUrl: string];
  };
}

export const About = ({ pet }: AboutProps) => {
  const [readMore, setReadMore] = useState(true);
  return (
    <View className="p-5">
      <Text className="font-semibold text-xl">Sobre {pet?.name}</Text>
      <Text numberOfLines={readMore ? 2 : 10} className="text-lg">
        {pet?.description}
      </Text>
      {readMore && (
        <Text onPress={() => setReadMore(false)} className=" underline">
          Leia mais...
        </Text>
      )}
    </View>
  );
};
