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
import { User } from "firebase/auth";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FormScreen"
              component={FormScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PetDetails"
              component={PetDetails}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
