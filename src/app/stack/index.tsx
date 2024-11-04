// * React Navigation Stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

// * Helpers
import { getSessionToken } from "@/src/data/helpers/storage";

// * React
import { useEffect, useState } from "react";

// * Components
import Toast from "react-native-toast-message";
import Loading from "../../components/loading";

// * Nativewind
import "../../../global.css";

// * Pages
import Tabs from "../tabs";
import Auth from "./auth";
// import Home from "./home";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSessionToken = async () => {
      const token = await getSessionToken();
      setIsAuthenticated(!!token);
    };

    checkSessionToken();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Tabs" : "Auth"}>
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
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default App;
