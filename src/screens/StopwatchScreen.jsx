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
        setTime(prevTime => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = time => {
    const getMilliseconds = `00${time % 1000}`.slice(-3);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
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
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.resetButton]}
              onPress={() => {
                setIsRunning(false);
                setTime(0);
              }}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.playPauseButton,
                isRunning ? styles.pauseButton : null,
              ]}
              onPress={() => setIsRunning(!isRunning)}>
              <Text style={styles.playPauseButtonText}>
                {isRunning ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  playPauseButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center', // Default to play button color
  },
  pauseButton: {
    backgroundColor: 'red',
  },
  resetButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center', // Assuming blue for reset button
  },
  resetButtonText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playPauseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Assuming white for play/pause button text
  },
});

export default StopwatchScreen;
