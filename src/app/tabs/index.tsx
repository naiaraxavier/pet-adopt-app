// * React Navigation Bottom Tabs
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// * Pages
import Chat from "./chat";
import Home from "./home";
import Profile from "./profile";
import FavoritesPage from "./favorites";

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
                color={focused ? "#464646" : "#FFF"}
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
          backgroundColor: "#F7924A",
          paddingVertical: 6,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        },
      }}
    >
      {tab("Inicio", Home, "home")}
      {tab("Favorites", FavoritesPage, "heart")}
      {tab("Chat", Chat, "chatbubble")}
      {tab("Perfil", Profile, "person")}
    </Tab.Navigator>
  );
};

export default Tabs;
