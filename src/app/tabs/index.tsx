// * React Navigation Bottom Tabs
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// * Pages
import Home from './home';
import FavoritesPage from './favorites';
import { AddPetButton } from '@/src/components/add-pet-button';

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
            <View className='items-center'>
              <Ionicons
                name={icone as any}
                size={28}
                color={focused ? '#F7924A' : '#464646'}
              />
            </View>
          ),
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          paddingVertical: 6,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        },
      }}
    >
      {tab('Inicio', Home, 'home')}
      {tab('Favorites', FavoritesPage, 'heart')}
      <Tab.Screen
        name='AddPet'
        component={Home} // This component won't be used, it's just a placeholder
        options={{
          tabBarButton: () => <AddPetButton />,
        }}
      />
      {tab('Chat', Home, 'chatbubble')}
      {tab('Perfil', Home, 'person')}
    </Tab.Navigator>
  );
};

export default Tabs;
