import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbGF4eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
      }}
      style={styles.background}>
      <View style={styles.topBar}>
        <Text style={styles.date}>{currentTime.toLocaleDateString()}</Text>
        <Text style={styles.day}>
          {currentTime.toLocaleDateString('en-US', {weekday: 'long'})}
        </Text>
        <Text style={styles.month}>
          {currentTime.toLocaleDateString('en-US', {month: 'long'})}
        </Text>
      </View>
      <View style={styles.overlay}>
        {location && <Text style={styles.location}>{location}</Text>}
        <Text style={styles.subtitle}>{currentTime.toLocaleTimeString()}</Text>
        <Text>Clock Application</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 0,
  },
  date: {
    fontSize: 16,
    color: '#ccc',
  },
  day: {
    fontSize: 16,
    color: '#ccc',
  },
  month: {
    fontSize: 16,
    color: '#ccc',
  },
  location: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default HomeScreen;
