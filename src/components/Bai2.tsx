import { View, Text, TouchableOpacity, } from 'react-native';
import { StyleSheet } from 'react-native';
import { Alert, Button } from 'react-native';

type Props = {
  name: string;
  age: number;
};
const Bai2 = ({ name, age }: Props) => {
  const handleHello = () => {
    Alert.alert(`Hello, ${name}! You are ${age} years old.`);
  };
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleHello}>
          <Text style={styles.text}>Click Me</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
export default Bai2;