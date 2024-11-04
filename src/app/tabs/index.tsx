// * React Navigation Bottom Tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

// * Pages
import Home from "./home";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const tab = (nome: string, componente: any, icone: string) => {
    return (
      <Tab.Screen
        name={nome}
        component={componente}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Ionicons
                name={icone as any}
                size={28}
                color={focused ? "#F7924A" : "#464646"}
              />
            </View>
          ),
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          paddingVertical: 6,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {tab("Inicio", Home, "home")}
      {tab("Favoritos", Home, "heart")}
      {tab("Chat", Home, "chatbubble")}
      {tab("Perfil", Home, "person")}
    </Tab.Navigator>
  );
};

export default Tabs;
