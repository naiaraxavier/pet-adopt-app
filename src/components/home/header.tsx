import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { FIREBASE_AUTH } from "@/firebase.config";

export const Header = () => {
  const auth = FIREBASE_AUTH;
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserEmail(user && user.email ? user.email : "Usuário");
    });
  }, [auth]);

  return (
    <View className="flex flex-row justify-between items-center">
      <View>
        <Text className="text-lg ">Olá,</Text>
        <Text className="text-xl font-semibold">{userEmail}</Text>
      </View>
      <Image
        source={require("@/assets/images/avatar.png")}
        className="w-11 h-11"
      />
    </View>
  );
};
