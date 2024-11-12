// * React Native
import { View, Text, Dimensions, Image } from 'react-native';

// * Carousel
import Carousel from 'react-native-reanimated-carousel';

// * Data
import carouselData from '../data/pets-data/carousel/carousel.json';

export const CarouselHome = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View className='flex-1 justify-center items-center overflow-hidden shadow'>
      <Carousel
        loop
        data={carouselData}
        width={screenWidth}
        height={240}
        autoPlay={true}
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className='w-full h-full justify-end items-center  overflow-hidden relative'>
            <Image
              source={{ uri: item.image }}
              className='absolute inset-0 w-full h-full '
              resizeMode='cover'
              accessibilityLabel={`Imagem de ${item.title}`}
            />
            <View className='absolute bottom-2 left-2 right-0 bg-[#ffffffb7] p-1 items-center justify-center rounded-3xl w-[280px]'>
              <Text
                className='text-[#f87c23] text-2xl text-center font-bold mb-2'
                accessibilityRole='header'
              >
                {item.title}
              </Text>
              <Text className='font-semibold text-center'>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
