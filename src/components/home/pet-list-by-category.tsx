import { Category } from "./category";
import { db } from "@/firebase.config";
import { useEffect, useState } from "react";
import { PetListItem } from "./pet-list-item";
import { FlatList, View } from "react-native";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const PetListByCategory = () => {
  const [petList, setPetList] = useState<any[]>([]);

  useEffect(() => {
    GetPetList("Gatos");
  }, []);

  /**
   * Used to get Pet List on Category Select
   * @param {*} category
   */

  const GetPetList = async (category: string) => {
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
    } catch (error) {
      console.error("Erro ao buscar a lista de pets:", error);
    }
  };

  return (
    <View className="">
      <Category category={(value: string) => GetPetList(value)} />
      <FlatList
        data={petList}
        horizontal={true}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
};
