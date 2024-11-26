// * React
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

// * Firebase
import { FIREBASE_AUTH } from "../../../firebase.config";

// * Toast
import Toast from "react-native-toast-message";

// * Components
import Loading from "@/src/components/loading";

// * Interface
interface User {
  email: string | null;
}

const Profile = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      Toast.show({
        text1: "Saída realizada com sucesso.",
        type: "success",
      });
      navigation.navigate("Auth");
    } catch (error) {
      Toast.show({
        text1: "Error logging out. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 w-full">
      <View className="bg-[#FBD2B6] flex-1 justify-center items-center px-6 pt-3">
        <Text className="text-2xl font-bold text-[#464646] text-center">
          {user?.email}
        </Text>

        <TouchableOpacity
          className="bg-[#F7924A] rounded-full w-[245px] h-[50px] p-2 mt-4 flex justify-center items-center"
          onPress={handleLogout}
          disabled={loading}
        >
          <Text className="text-white font-bold text-center text-lg">Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
