// * Pages
import Auth from './auth';
import Tabs from '../tabs';

// * Nativewind
import '../../../global.css';

// * React
import { useEffect, useState } from 'react';

// * Components
import Toast from 'react-native-toast-message';
import Loading from '../../components/loading';

// * Helpers
import { getSession } from '@/src/data/helpers/storage';

// * React Navigation Stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { token } = await getSession();
      setIsAuthenticated(!!token);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Tabs' : 'Auth'}>
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Tabs'
          component={Tabs}
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
