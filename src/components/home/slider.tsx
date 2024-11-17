import { db } from "@/firebase.config";
import { useEffect, useRef, useState } from "react";
import { View, FlatList, Image } from "react-native";
import { collection, getDocs, DocumentData } from "@firebase/firestore";

export const Slider = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderList.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, sliderList.length]);

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
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
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
