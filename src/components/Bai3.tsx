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

  // =========================
  // STATE CỦA CHA
  // =========================

  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');

  // Dữ liệu đã Submit để truyền xuống Con
  const [nameSubmitted, setNameSubmitted] = React.useState('');
  const [ageSubmitted, setAgeSubmitted] = React.useState('');

  // Đếm số lần Submit
  const [dem, setDem] = React.useState(0);


  // =========================
  // KIỂM TRA NAME
  // =========================

  const handleNameChange = (text: string) => {

    // Chỉ cho phép chữ cái và khoảng trắng
    if (/^[\p{L}\s]*$/u.test(text)) {
      setName(text);
    } else {
      Alert.alert(
        'Invalid name',
        'Name chỉ được nhập chữ cái.'
      );
    }
  };


  // =========================
  // KIỂM TRA AGE
  // =========================

  const handleAgeChange = (text: string) => {

    // Chỉ cho phép số
    if (/^[0-9]*$/.test(text)) {
      setAge(text);
    } else {
      Alert.alert(
        'Invalid age',
        'Age chỉ được nhập số.'
      );
    }
  };


  // =========================
  // CHA → CON
  // =========================

  const handleProcess = () => {

    if (name.trim() === '') {
      Alert.alert(
        'Error',
        'Vui lòng nhập Name.'
      );
      return;
    }

    if (age.trim() === '') {
      Alert.alert(
        'Error',
        'Vui lòng nhập Age.'
      );
      return;
    }

    setNameSubmitted(name);
    setAgeSubmitted(age);
    setDem(dem + 1);
  };


  // =========================
  // ALERT Ở CHA
  // =========================

  const handleAlert = () => {

    if (name.trim() === '' || age.trim() === '') {
      Alert.alert(
        'Error',
        'Vui lòng nhập đầy đủ Name và Age.'
      );
      return;
    }

    Alert.alert(
      'Information of Parent',
      `Name: ${name}\nAge: ${age}`
    );
  };


  // =========================
  // DELETE Ở CHA
  // =========================

  const handleDelete = () => {
    setName('');
    setAge('');
  };


  // =========================
  // CON → CHA
  // =========================

  const handleSendToParent = (
    nameFromChild: string,
    ageFromChild: string
  ) => {

    setName(nameFromChild);
    setAge(ageFromChild);
  };


  return (
    <View>

      {/* ================= CHA ================= */}

      <View style={styles.container}>

        <Text style={styles.title}>
          Parent
        </Text>

        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
        />

        <TextInput
          placeholder="Enter your age"
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={handleAgeChange}
        />

        <View style={styles.buttonContainer}>

          {/* ALERT */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAlert}
          >
            <Text style={styles.buttonText}>
              Alert
            </Text>
          </TouchableOpacity>


          {/* DELETE */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Delete
            </Text>
          </TouchableOpacity>


          {/* CHA → CON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleProcess}
          >
            <Text style={styles.buttonText}>
              Submit
            </Text>
          </TouchableOpacity>

        </View>

      </View>


      {/* ================= CON ================= */}

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