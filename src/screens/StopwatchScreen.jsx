import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function StopwatchScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = time => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbGF4eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
      }}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(time)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isRunning ? styles.pauseButton : styles.playButton,
            ]}
            onPress={() => setIsRunning(!isRunning)}>
            <Text style={styles.buttonText}>
              {isRunning ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: 'green',
  },
  pauseButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default StopwatchScreen;
