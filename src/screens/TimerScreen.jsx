import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function TimerScreen() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleHoursChange = text => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const num = parseInt(sanitizedText, 10);
    if (!isNaN(num) && num >= 0 && num <= 24) {
      setHours(sanitizedText);
    } else if (sanitizedText === '') {
      setHours('');
    }
  };

  const handleMinutesChange = text => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const num = parseInt(sanitizedText, 10);
    if (!isNaN(num) && num >= 0 && num < 60) {
      setMinutes(sanitizedText);
    } else if (sanitizedText === '') {
      setMinutes('');
    }
  };

  const handleSecondsChange = text => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const num = parseInt(sanitizedText, 10);
    if (!isNaN(num) && num >= 0 && num < 60) {
      setSeconds(sanitizedText);
    } else if (sanitizedText === '') {
      setSeconds('');
    }
  };

  const startTimer = () => {
    if (intervalRef.current) {
      return;
    }

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        let sec = parseInt(prev, 10);
        let min = parseInt(minutes, 10);
        let hr = parseInt(hours, 10);

        if (sec > 0) {
          return (sec - 1).toString().padStart(2, '0');
        } else if (min > 0) {
          setMinutes((min - 1).toString().padStart(2, '0'));
          return '59';
        } else if (hr > 0) {
          setHours((hr - 1).toString().padStart(2, '0'));
          setMinutes('59');
          return '59';
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return '00';
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHours('');
    setMinutes('');
    setSeconds('');
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.timerContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="00"
          placeholderTextColor="#888" // Warna placeholder
          value={hours}
          onChangeText={handleHoursChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="00"
          placeholderTextColor="#888" // Warna placeholder
          value={minutes}
          onChangeText={handleMinutesChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="00"
          placeholderTextColor="#888" // Warna placeholder
          value={seconds}
          onChangeText={handleSecondsChange}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Timer Screen</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftButtonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={isRunning ? pauseTimer : startTimer}>
            <Text style={styles.playPauseButtonText}>
              {isRunning ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonContainer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    width: 100,
    height: 100,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 58,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
    width: '80%',
    alignSelf: 'center',
  },
  leftButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightButtonContainer: {
    flex: 1,
  },
  playPauseButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerScreen;
