import { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Bai5Child from './Bai5Child';

const Bai5 = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Function để nhận dữ liệu từ component con
  const updateInfo = (newName: string, newAge: string) => {
    setName(newName);
    setAge(newAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Component cha
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={styles.info}>
        Kết quả: {name}, {age} tuổi
      </Text>
      <Bai5Child
        name={name}
        age={age}
        onUpdate={updateInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    width: 250,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },

  info: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Bai5;