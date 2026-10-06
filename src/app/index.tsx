import { View, StyleSheet } from 'react-native';
import ParentComponent from '@/components/ParentComponent';
import Bai3 from '@/components/Bai3';

export default function App() {
  return (
    <View style={styles.container}>
      <Bai3/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    padding: 20,
    flex: 1,
  }
});
