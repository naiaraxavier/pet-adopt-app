import { ScrollView, SafeAreaView, Text } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-50 w-full">
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, width: "100%" }}
      >
        <Text>Home</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
