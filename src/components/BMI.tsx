import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const BMI = () => {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');

  const [weightError, setWeightError] = React.useState('');
  const [heightError, setHeightError] = React.useState('');

  const [bmi, setBmi] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState('');
  const [categoryColor, setCategoryColor] = React.useState('black');
  const [suggestion, setSuggestion] = React.useState('');
  const [idealWeight, setIdealWeight] = React.useState('');

  // Phân loại BMI
  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Gầy (Underweight)',
        color: '#F59E0B',
        suggestion: 'Bạn nên có chế độ ăn uống đầy đủ dinh dưỡng và tập thể dục đều đặn hơn nhé!',
      };
    } else if (bmiValue < 25) {
      return {
        category: 'Bình thường (Normal)',
        color: '#22C55E',
        suggestion: 'Bạn đang ở mức cân nặng bình thường, hãy duy trì chế độ ăn uống và vận động hợp lý như vậy nhé!',
      };
    } else if (bmiValue < 30) {
      return {
        category: 'Thừa cân (Overweight)',
        color: '#F97316',
        suggestion: 'Bạn có thể cân nhắc điều chỉnh chế độ ăn uống và tăng cường vận động nhiều hơn nhé!',
      };
    } else {
      return {
        category: 'Béo phì (Obese)',
        color: '#EF4444',
        suggestion: 'Bạn nên chú ý đến chế độ ăn uống, vận động và cân nhắc tham khảo thêm ý kiến chuyên gia để có kế hoạch giảm cân hợp lý nhé!',
      };
    }
  };

  const calculateBMI = () => {
    setWeightError('');
    setHeightError('');

    const weightNum = parseFloat(weight);
    const heightCm = parseFloat(height);
    
  if (weight === '') {
    setWeightError('Vui lòng nhập cân nặng');
  }

  if (height === '') {
    setHeightError('Vui lòng nhập chiều cao');
  }

  if (weight === '' || height === '') {
    return;
  }

  if (isNaN(weightNum)) {
    setWeightError('Cân nặng phải là số');
    return;
  }

  if (isNaN(heightCm)) {
    setHeightError('Chiều cao phải là số');
    return;
  }

  if (weightNum <= 0) {
    setWeightError('Cân nặng phải lớn hơn 0');
    return;
  }

  if (heightCm <= 0) {
    setHeightError('Chiều cao phải lớn hơn 0');
    return;
  }

    // Đổi chiều cao từ cm sang m
    const heightM = heightCm / 100;

    // Công thức BMI
    const bmiValue = weightNum / (heightM * heightM);

    // Lấy phân loại
    const result = getBMICategory(bmiValue);

    // Tính khoảng cân nặng tham khảo dựa trên BMI 18.5 - 24.9
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    // Hiển thị kết quả
    setBmi(bmiValue);
    setCategory(result.category);
    setCategoryColor(result.color);
    setSuggestion(result.suggestion);
    setIdealWeight(
      `${minWeight.toFixed(1)} kg - ${maxWeight.toFixed(1)} kg`
    );
  };

  const resetBMI = () => {
    setWeight('');
    setHeight('');
    setWeightError('');
    setHeightError('');
    setBmi(null);
    setCategory('');
    setCategoryColor('black');
    setSuggestion('');
    setIdealWeight('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center', color: 'orange' }}>
        Đinh Thị Mừng - 24PNV1A
      </Text>

      <Text style={styles.label}>Cân nặng (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập cân nặng"
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
      />
      {weightError !== '' && (<Text style={styles.errorText}>{weightError}</Text>)}

      <Text style={styles.label}>Chiều cao (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập chiều cao"
        keyboardType="decimal-pad"
        value={height}
        onChangeText={setHeight}
      />
      {heightError !== '' && (<Text style={styles.errorText}>{heightError}</Text>)}
      <View style={styles.buttonContainer}>
        <Button title="Calculate" onPress={calculateBMI} />
        <Button title="Reset" onPress={resetBMI} />
      </View>

      {bmi !== null && (
        <View style={styles.resultContainer}>

          <Text style={styles.bmiText}>
            Kết quả BMI: {bmi.toFixed(2)}
          </Text>

          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {category}
          </Text>

          <Text style={styles.idealText}>
            Cân nặng tham khảo: {idealWeight}
          </Text>

          <Text style={styles.suggestionText}>
            {suggestion}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BMI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  errorText: {
  color: 'red',
  fontStyle: 'italic',
  marginBottom: 10,
},

  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 5,
    justifyContent: 'center',
  },

  resultContainer: {
    marginTop: 30,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
  },

  bmiText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  idealText: {
    fontSize: 17,
    marginBottom: 10,
    fontStyle: 'italic',
  },

  suggestionText: {
    fontSize: 17,
    lineHeight: 22,
    color: 'green',
  },
});