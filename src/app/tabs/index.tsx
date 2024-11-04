import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  function tab(nome: string, componente: any, label: string, icone: string) {
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
                size={22}
                color={focused ? "#FFF" : "#CCC"}
              />
              <Text
                className={`text-sm ${
                  focused ? "text-white" : "text-gray-300"
                }`}
              >
                {label}
              </Text>
            </View>
          ),
        }}
      />
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#7811F5",
        tabBarInactiveBackgroundColor: "#7811F5",
        tabBarStyle: {
          backgroundColor: "#7811F5",
        },
      }}
    >
      {tab("Inicio", Home, "Início", "home-outline")}
      {tab("Favoritos", Home, "Favoritos", "heart-outline")}
      {tab("Chat", Home, "Chat", "chatbubble-outline")}
      {tab("Perfil", Home, "Perfil", "person-outline")}
    </Tab.Navigator>
  );
}
