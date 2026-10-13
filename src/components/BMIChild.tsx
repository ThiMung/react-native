import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// Khai báo các props nhận từ cha
type Props = {
  weight: string;
  height: string;

  weightError: string;
  heightError: string;

  // Callback gửi sự kiện lên cha
  onWeightChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
};

const BMIChild = ({
  weight,
  height,
  weightError,
  heightError,
  onWeightChange,
  onHeightChange,
  onCalculate,
  onReset,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cân nặng (kg)</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập cân nặng"
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={onWeightChange}
      />

      {weightError !== "" && (
        <Text style={styles.errorText}>{weightError}</Text>
      )}

      <Text style={styles.label}>Chiều cao (cm)</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập chiều cao"
        keyboardType="decimal-pad"
        value={height}
        onChangeText={onHeightChange}
      />

      {heightError !== "" && (
        <Text style={styles.errorText}>{heightError}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Calculate" onPress={onCalculate} />

        <Button title="Reset" onPress={onReset} />
      </View>
    </View>
  );
};

export default BMIChild;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  },

  errorText: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 15,
  },
});
