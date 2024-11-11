// * React Native
import { View, Text, Dimensions } from "react-native";

// * Carousel
import Carousel from "react-native-reanimated-carousel";

export const CarouselHome = () => {
  const data = [
    { title: "Slide 1" },
    { title: "Slide 2" },
    { title: "Slide 3" },
  ];

  const screenWidth = Dimensions.get("window").width * 0.9;

  return (
    <Carousel
      loop
      data={data}
      height={200}
      autoPlay={true}
      width={screenWidth}
      autoPlayInterval={3000}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View className="h-full justify-center">
          <Text className="text-center">{item.title}</Text>
        </View>
      )}
    />
  );
};
