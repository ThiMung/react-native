import { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet,} from 'react-native';

type Props = {
  name: string;
  age: string;
  onUpdate: (newName: string, newAge: string) => void;
};

const Bai5Child = ({ name, age, onUpdate }: Props) => {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const handleUpdate = () => {
    onUpdate(newName, newAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Component con
      </Text>
      <Text>
        Dữ liệu từ cha: {name}, {age} tuổi
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên mới"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi mới"
        value={newAge}
        onChangeText={setNewAge}
        keyboardType="numeric"
      />
      <Button
        title="Cập nhật"
        onPress={handleUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
  },
});

export default Bai5Child;