import { View, StyleSheet } from 'react-native';
import ParentControl from '@/components/light/ParentControl';

export default function App() {
  return (
    <View style={styles.container}>
      <ParentControl/>
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
