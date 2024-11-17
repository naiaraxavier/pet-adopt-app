import { db } from "@/firebase.config";
import { useEffect, useState } from "react";
import { View, FlatList, Image } from "react-native";
import { collection, getDocs, DocumentData } from "@firebase/firestore";

export const Slider = () => {
  const [sliderList, setSliderList] = useState<DocumentData[]>([]);

  const getSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  useEffect(() => {
    getSliders();
  }, []);

  return (
    <View className="mt-4">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-[90vw] mr-3 ">
            <Image
              source={{ uri: item?.imageUrl }}
              className="h-[180px] rounded-xl"
            />
          </View>
        )}
      />
    </View>
  );
};
