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
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0 && num <= 24) {
      setHours(text);
    } else if (text === '') {
      setHours('');
    }
  };

  const handleMinutesChange = text => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0 && num < 60) {
      setMinutes(text);
    } else if (text === '') {
      setMinutes('');
    }
  };

  const handleSecondsChange = text => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= 0 && num < 60) {
      setSeconds(text);
    } else if (text === '') {
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
          placeholder="H"
          value={hours}
          onChangeText={handleHoursChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="M"
          value={minutes}
          onChangeText={handleMinutesChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="S"
          value={seconds}
          onChangeText={handleSecondsChange}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Timer Screen</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={isRunning ? pauseTimer : startTimer}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 58,
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TimerScreen;
