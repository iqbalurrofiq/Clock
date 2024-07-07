import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AlarmScreen from './screens/AlarmScreen';
import WorldClockScreen from './screens/WorldClockScreen';
import TimerScreen from './screens/TimerScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Alarm':
                iconName = 'alarm';
                break;
              case 'World Clock':
                iconName = 'earth';
                break;
              case 'Timer':
                iconName = 'timer-sand';
                break;
              case 'Stopwatch':
                iconName = 'timer';
                break;
              default:
                iconName = 'help-circle';
                break;
            }

            // Return the icon component
            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
          },
        })}
        tabBarOptions={{
          showLabel: false, // Optional: Hide labels if you want only icons
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="World Clock" component={WorldClockScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
