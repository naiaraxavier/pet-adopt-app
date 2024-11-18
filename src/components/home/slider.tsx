import { db } from "@/firebase.config";
import { useEffect, useRef, useState } from "react";
import { View, FlatList, Image } from "react-native";
import { collection, getDocs, DocumentData } from "@firebase/firestore";

export const Slider = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderList, setSliderList] = useState<DocumentData[]>([]);

  const getSliders = async () => {
    const snapshot = await getDocs(collection(db, "Sliders"));
    const sliders = snapshot.docs.map((doc) => doc.data());
    setSliderList(sliders);
  };

  useEffect(() => {
    getSliders();
  }, []);

  useEffect(() => {
    if (sliderList.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderList.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, sliderList.length]);
  useEffect(() => {
    if (sliderList.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, sliderList.length]);

  const renderItem = ({ item }: { item: DocumentData }) => (
    <View className="w-[90vw] mr-3">
      <Image
        source={{ uri: item?.imageUrl }}
        className="h-[180px] rounded-xl"
      />
    </View>
  );

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => {
          if (sliderList.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: currentIndex,
              animated: true,
            });
          }
        }}
      />
    </View>
  );
};
