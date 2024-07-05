import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AlarmScreen from './screens/AlarmScreen';
import WorldClockScreen from './screens/WorldClockScreen';
import TimerScreen from './screens/TimerScreen';
import StopwatchScreen from './screens/StopwatchScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
