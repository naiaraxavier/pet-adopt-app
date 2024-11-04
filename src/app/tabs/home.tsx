import { ScrollView, SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#0E001D] w-full">
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, width: "100%" }}
      >
        <Text className="text-white">Home</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
