import { db } from "@/firebase.config";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

interface CategoryProps {
  category: (value: string) => void;
}

export const Category = ({ category }: CategoryProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Cats");

  const GetCategories = async () => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategories((categories) => [...categories, doc.data()]);
    });
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <View className="mt-5">
      <Text className="text-xl font-semibold">Categorias</Text>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item?.name);
              category(item?.name);
            }}
            className="flex-1"
          >
            <View
              className={`p-4 m-2 justify-center items-center rounded-lg  border ${
                selectedCategory == item?.name
                  ? "bg-gray-400 border-gray-800"
                  : "bg-orange-50 border-orange-300"
              }`}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                className="h-10 w-10 rounded-xl"
              />
            </View>
            <Text className="text-center">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
