import { SafeAreaView, Text, View } from "react-native";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 w-full">
      <View className="bg-[#FBD2B6] flex-1 justify-center items-center px-6 pt-3">
        <Text className="text-2xl font-bold text-[#464646] text-center">
          Chat
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
