import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

type Props = {
  // Cha → Con
  nameProp: string;
  ageProp: string;
  demProp: number;

  // Con → Cha
  onSendToParent: (name: string, age: string) => void;
};


const Bai3Child = ({
  nameProp,
  ageProp,
  demProp,
  onSendToParent,
}: Props) => {

  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');

  useEffect(() => {
    setName(nameProp);
    setAge(ageProp);
  }, [nameProp, ageProp, demProp]);

  // Alert ở Con
  const handleAlert = () => {
    Alert.alert(
      'Information of Child',
      `Name: ${name}\nAge: ${age}`
    );
  };

  // Delete ở Con
  const handleDelete = () => {
    setName('');
    setAge('');
  };

  // Con → Cha
  const handleSubmit = () => {
    onSendToParent(name, age);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child</Text>

      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter your age"
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAlert}
        >
          <Text style={styles.buttonText}>Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Bai3Child;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  receiveText: {
    marginBottom: 10,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});