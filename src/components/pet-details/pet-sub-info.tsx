import { View, Text, Image } from "react-native";

interface PetSubInfoProps {
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

export const PetSubInfo = ({ pet }: PetSubInfoProps) => {
  return (
    <>
      <View className="px-5 mb-2 flex flex-row gap-3">
        <View className="flex-1 flex-row items-center justify-center p-2 bg-slate-100 gap-2 rounded-md">
          <View className="flex justify-center">
            <Image
              className="w-10 h-10 rounded"
              source={{
                uri: "https://cdn-icons-png.freepik.com/256/14316/14316759.png?ga=GA1.1.904123655.1726780547&semt=ais_hybrid",
              }}
            />
          </View>
          <View>
            <Text className=" text-gray-400 text-sm">Idade</Text>
            <Text className="text-lg ">{pet?.age || "??"} anos</Text>
          </View>
        </View>

        <View className="flex-1 flex-row justify-center items-center p-2 bg-slate-100 gap-2 rounded-md">
          <View className="flex justify-center">
            <Image
              className="w-10 h-10 rounded"
              source={{
                uri: "https://cdn-icons-png.freepik.com/256/11815/11815770.png?ga=GA1.1.904123655.1726780547&semt=ais_hybrid",
              }}
            />
          </View>
          <View>
            <Text className=" text-gray-400 text-sm">Sexo</Text>
            <Text className="text-lg ">{pet?.sex || "??"}</Text>
          </View>
        </View>
      </View>

      <View className="px-5 flex flex-row gap-3">
        <View className="flex-1 flex-row items-center justify-center p-2 bg-slate-100 gap-2 rounded-md">
          <View className="flex justify-center">
            <Image
              className="w-10 h-10 rounded"
              source={{
                uri: "https://cdn-icons-png.freepik.com/256/11505/11505897.png?ga=GA1.1.904123655.1726780547&semt=ais_hybrid",
              }}
            />
          </View>
          <View>
            <Text className=" text-gray-400 text-sm">Peso</Text>
            <Text className="text-lg ">{pet?.weight || "??"}</Text>
          </View>
        </View>

        <View className="flex-1 flex-row justify-center items-center p-2 bg-slate-100 gap-2 rounded-md">
          <View className="flex justify-center">
            <Image
              className="w-10 h-10 rounded"
              source={{
                uri: "https://cdn-icons-png.freepik.com/256/11907/11907119.png?ga=GA1.1.904123655.1726780547&semt=ais_hybrid",
              }}
            />
          </View>
          <View>
            <Text className=" text-gray-400 text-sm">Raça</Text>
            <Text className="text-lg ">{`${pet?.breed}` || "??"}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
