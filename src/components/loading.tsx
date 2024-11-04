// * Components
import { View, Text, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-xl mb-4">Loading...</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default Loading;
