import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";

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
            <View style={styles.tabScreen}>
              <Ionicons
                name={icone as any}
                size={22}
                color={focused ? "#FFF" : "#CCC"}
              />
              <Text
                style={{
                  ...styles.tabScreenText,
                  color: focused ? "#FFF" : "#CCC",
                }}
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
      initialRouteName="Home"
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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabScreen: {
    alignItems: "center",
  },
  tabScreenText: {
    fontSize: 14,
  },
});
