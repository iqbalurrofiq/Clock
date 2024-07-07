import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

function TimerScreen() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

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

  return (
    <View style={{flex: 1}}>
      <View style={styles.timerContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="HH"
          value={hours}
          onChangeText={handleHoursChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="MM"
          value={minutes}
          onChangeText={handleMinutesChange}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="SS"
          value={seconds}
          onChangeText={handleSecondsChange}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Timer Screen</Text>
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
});

export default TimerScreen;
