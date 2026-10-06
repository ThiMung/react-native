import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Bai3Child from './Bai3Child';

const Bai3 = () => {

  // Dữ liệu nhập ở Cha
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');

  // Dữ liệu đã Submit để truyền xuống Con
  const [nameSubmitted, setNameSubmitted] = React.useState('');
  const [ageSubmitted, setAgeSubmitted] = React.useState('');

  // Đếm số lần Submit từ Cha
  const [dem, setDem] = React.useState(0);

  // Cha → Con
  const handleProcess = () => {
    setNameSubmitted(name);
    setAgeSubmitted(age);
    setDem(dem + 1);
  };

  // Alert ở Cha
  const handleAlert = () => {
    Alert.alert(
      'Information of Parent',
      `Name: ${name}\nAge: ${age}`
    );
  };

  // Delete ở Cha
  const handleDelete = () => {
    setName('');
    setAge('');
  };

  // Con → Cha
  const handleSendToParent = (nameFromChild: string, ageFromChild: string) => {
    setName(nameFromChild);
    setAge(ageFromChild);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Parent</Text>

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

          {/* ALERT */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAlert}
          >
            <Text style={styles.buttonText}>Alert</Text>
          </TouchableOpacity>

          {/* DELETE */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          {/* TRUYỀN CHA → CON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleProcess}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>

        <Bai3Child
          nameProp={nameSubmitted}
          ageProp={ageSubmitted}
          demProp={dem}
          onSendToParent={handleSendToParent}
        />
    </View>
  );
};

export default Bai3;


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
    width: '100%',
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