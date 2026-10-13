import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BMIChild from './BMIChild';

const BMI = () => {
  // 1. State chính của component cha
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');

  const [bmiResult, setBmiResult] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState('');
  const [colorResult, setColorResult] = React.useState('black');

  // State phụ để hiển thị lỗi và thông tin bổ sung
  const [weightError, setWeightError] = React.useState('');
  const [heightError, setHeightError] = React.useState('');
  const [suggestion, setSuggestion] = React.useState('');
  const [idealWeight, setIdealWeight] = React.useState('');

  // 2. Hàm phân loại BMI theo các ngưỡng WHO
  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Gầy (Underweight)',
        color: '#F59E0B',
        suggestion:
          'Bạn nên có chế độ ăn uống đầy đủ dinh dưỡng và tập thể dục đều đặn hơn nhé!',
      };
    } else if (bmiValue < 25) {
      return {
        category: 'Bình thường (Normal)',
        color: '#22C55E',
        suggestion:
          'Bạn đang ở mức cân nặng bình thường, hãy duy trì chế độ ăn uống và vận động hợp lý nhé!',
      };
    } else if (bmiValue < 30) {
      return {
        category: 'Thừa cân (Overweight)',
        color: '#F97316',
        suggestion:
          'Bạn có thể cân nhắc điều chỉnh chế độ ăn uống và tăng cường vận động.',
      };
    } else {
      return {
        category: 'Béo phì (Obese)',
        color: '#EF4444',
        suggestion:
          'Bạn nên chú ý đến chế độ ăn uống, vận động và cân nhắc tham khảo ý kiến chuyên gia.',
      };
    }
  };

  // 3. Xóa kết quả tính toán cũ
  const clearResult = () => {
    setBmiResult(null);
    setCategory('');
    setColorResult('black');
    setSuggestion('');
    setIdealWeight('');
  };

  // 4. Nhận cân nặng từ component con
  const handleWeightChange = (value: string) => {
    setWeight(value);
    setWeightError('');
    clearResult();
  };

  // 5. Nhận chiều cao từ component con
  const handleHeightChange = (value: string) => {
    setHeight(value);
    setHeightError('');
    clearResult();
  };

  // 6. Thuật toán tính BMI - thuộc component cha
  const calculateBMI = () => {
    setWeightError('');
    setHeightError('');
    clearResult();

    // Kiểm tra dữ liệu trống
    if (weight.trim() === '') {
      setWeightError('Vui lòng nhập cân nặng');
    }

    if (height.trim() === '') {
      setHeightError('Vui lòng nhập chiều cao');
    }

    if (weight.trim() === '' || height.trim() === '') {
      return;
    }

    // Chuyển dữ liệu nhập thành số
    const weightNum = Number(weight.replace(',', '.'));
    const heightCm = Number(height.replace(',', '.'));

    // Kiểm tra dữ liệu phải là số hợp lệ
    if (!Number.isFinite(weightNum)) {
      setWeightError('Cân nặng phải là số hợp lệ');
      return;
    }

    if (!Number.isFinite(heightCm)) {
      setHeightError('Chiều cao phải là số hợp lệ');
      return;
    }

    // Kiểm tra giá trị lớn hơn 0
    if (weightNum <= 0) {
      setWeightError('Cân nặng phải lớn hơn 0');
      return;
    }

    if (heightCm <= 0) {
      setHeightError('Chiều cao phải lớn hơn 0');
      return;
    }

    // Tính BMI từ cân nặng (kg) và chiều cao (cm)
    const heightM = heightCm / 100;
    const bmiValue = weightNum / (heightM * heightM);

    // Lấy phân loại và màu sắc
    const result = getBMICategory(bmiValue);

    // Tính khoảng cân nặng tham khảo
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    // Cập nhật kết quả vào state của cha
    setBmiResult(bmiValue);
    setCategory(result.category);
    setColorResult(result.color);
    setSuggestion(result.suggestion);

    setIdealWeight(
      `${minWeight.toFixed(1)} kg - ${maxWeight.toFixed(1)} kg`,
    );
  };

  // 7. Reset dữ liệu - thuộc component cha
  const resetBMI = () => {
    setWeight('');
    setHeight('');
    setWeightError('');
    setHeightError('');
    clearResult();
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>BMI Calculator</Text>

      <Text style={styles.student}>
        Đinh Thị Mừng - 24PNV1A
      </Text>

      {/* Component cha truyền state và callback xuống con */}
      <BMIChild
        weight={weight}
        height={height}
        weightError={weightError}
        heightError={heightError}
        onWeightChange={handleWeightChange}
        onHeightChange={handleHeightChange}
        onCalculate={calculateBMI}
        onReset={resetBMI}
      />

      {/* Component cha tự hiển thị kết quả BMI */}
      {bmiResult !== null && (
        <View
          style={[
            styles.resultContainer,
            { borderColor: colorResult },
          ]}
        >
          <Text style={styles.bmiText}>
            Kết quả BMI: {bmiResult.toFixed(2)}
          </Text>

          <Text
            style={[
              styles.categoryText,
              { color: colorResult },
            ]}
          >
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
    </ScrollView>
  );
};

export default BMI;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },

  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  student: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'orange',
  },

  resultContainer: {
    marginTop: 25,
    padding: 15,
    borderWidth: 1.5,
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
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },

  suggestionText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'green',
  },
});