// * Screens
import Auth from "./auth";
import Tabs from "../tabs";
import FormScreen from "./form-add-pets";

// * Nativewind
import "../../../global.css";

// * React
import { useEffect, useState } from "react";

// * Components
import Toast from "react-native-toast-message";
import Loading from "../../components/loading";

// * Helpers
import { FIREBASE_AUTH } from "@/firebase.config";

// * React Navigation Stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { PetDetails } from "../stack/pet-details";

const Stack = createNativeStackNavigator();

const App = () => {
  const auth = FIREBASE_AUTH;
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserEmail(user && user.email ? user.email : "Usuário");
    });
  }, [auth]);

  if (!userEmail) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={userEmail ? "Tabs" : "Auth"}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PetDetails"
          component={PetDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default App;
