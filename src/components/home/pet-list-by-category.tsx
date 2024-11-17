import { Category } from "./category";
import { db } from "@/firebase.config";
import { useEffect, useState } from "react";
import { PetListItem } from "./pet-list-item";
import { FlatList, View, Text } from "react-native";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const PetListByCategory = () => {
  const [petList, setPetList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetPetList("Gatos");
  }, []);

  /**
   * Used to get Pet List on Category Select
   * @param {*} category
   */

  const GetPetList = async (category: string) => {
    setLoading(true);
    setPetList([]);

    const q = query(
      collection(db, "Pets"),
      where("category", "==", category ? category : "Gatos")
    );

    try {
      const querySnapshot = await getDocs(q);

      const pets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPetList(pets);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar a lista de pets:", error);
    }
  };

  return (
    <View>
      <Category category={(value: string) => GetPetList(value)} />

      <Text className="text-xl font-semibold py-4 pl-1">Próximos a você</Text>

      <FlatList
        data={petList}
        horizontal={true}
        refreshing={loading}
        onRefresh={() => GetPetList("Gatos")}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
};
