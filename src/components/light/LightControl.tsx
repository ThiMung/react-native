import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BRIGHTNESS_STEP = 12;

type LightControlProps = {
  isOn: boolean;
  count: number;
  onToggle: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

const LightControl = ({
  isOn,
  count,
  onToggle,
  onIncrease,
  onDecrease,
}: LightControlProps) => {
  const canIncrease = isOn && count + BRIGHTNESS_STEP <= 100;
  const canDecrease = isOn && count - BRIGHTNESS_STEP >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Child Component</Text>

      <Text style={styles.info}>
        Trạng thái đèn:{' '}
        <Text style={[styles.status, isOn ? styles.statusOn : styles.statusOff]}>
          {isOn ? 'Bật' : 'Tắt'}
        </Text>
      </Text>
      <Text style={styles.info}>Độ sáng hiện tại: {count}%</Text>

      <View style={styles.imageContainer}>
        <Image
          source={
            isOn
              ? require('../../../assets/images/densang.png')
              : require('../../../assets/images/dentat.png')
          }
          style={[
            styles.lampImage,
            { opacity: isOn ? 0.4 + (count / 100) * 0.6 : 1 },
          ]}
          resizeMode="contain"
          accessibilityLabel={isOn ? 'Bóng đèn đang bật' : 'Bóng đèn đang tắt'}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isOn ? styles.turnOffButton : styles.turnOnButton]}
        onPress={onToggle}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>{isOn ? 'Tắt đèn' : 'Bật đèn'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !canIncrease && styles.disabledButton]}
        onPress={onIncrease}
        disabled={!canIncrease}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Tăng độ sáng (+12)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !canDecrease && styles.disabledButton]}
        onPress={onDecrease}
        disabled={!canDecrease}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Giảm độ sáng (-12)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LightControl;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D5DDE5',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  sectionTitle: {
    color: '#173B63',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  info: {
    color: '#273746',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  status: {
    fontWeight: 'bold',
  },
  statusOn: {
    color: '#218838',
  },
  statusOff: {
    color: '#D32F2F',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F8FB',
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 12,
    minHeight: 200,
  },
  lampImage: {
    height: 190,
    maxWidth: '100%',
    width: 220,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1976D2',
    borderRadius: 9,
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  turnOnButton: {
    backgroundColor: '#2E7D32',
  },
  turnOffButton: {
    backgroundColor: '#C62828',
  },
  disabledButton: {
    backgroundColor: '#AEB7C2',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
