import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LightControl from './LightControl';

const BRIGHTNESS_STEP = 12;
const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 100;

const ParentControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(MIN_BRIGHTNESS);

  const handleToggleLight = () => {
    setCount(MIN_BRIGHTNESS);
    setIsOn((currentIsOn) => !currentIsOn);
  };

  const handleIncreaseBrightness = () => {
    if (!isOn) {
      return;
    }

    setCount((currentCount) => {
      const nextCount = currentCount + BRIGHTNESS_STEP;
      return nextCount >= MIN_BRIGHTNESS && nextCount <= MAX_BRIGHTNESS
        ? nextCount
        : currentCount;
    });
  };

  const handleDecreaseBrightness = () => {
    if (!isOn) {
      return;
    }

    setCount((currentCount) => {
      const nextCount = currentCount - BRIGHTNESS_STEP;
      return nextCount >= MIN_BRIGHTNESS && nextCount <= MAX_BRIGHTNESS
        ? nextCount
        : currentCount;
    });
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.appTitle}>
          HỆ THỐNG ĐIỀU KHIỂN ĐÈN THÔNG MINH
        </Text>
        <Text style={styles.studentInfo}>SVTH: Đinh Thị Mừng</Text>
        <Text style={styles.studentInfo}>Ngày sinh: 07/12/2005</Text>
      </View>

      <View style={styles.parentSection}>
        <Text style={styles.sectionTitle}>Parent Component</Text>

        <Text style={styles.info}>
          Trạng thái đèn:{' '}
          <Text style={[styles.status, isOn ? styles.statusOn : styles.statusOff]}>
            {isOn ? 'Bật' : 'Tắt'}
          </Text>
        </Text>
        <Text style={styles.info}>Độ sáng hiện tại: {count}%</Text>
      </View>

      <LightControl
        isOn={isOn}
        count={count}
        onToggle={handleToggleLight}
        onIncrease={handleIncreaseBrightness}
        onDecrease={handleDecreaseBrightness}
      />
    </ScrollView>
  );
};

export default ParentControl;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
    borderRadius: 14,
    marginBottom: 16,
    padding: 18,
  },
  appTitle: {
    color: '#173B63',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  studentInfo: {
    alignSelf: 'stretch',
    color: '#34495E',
    fontSize: 15,
    lineHeight: 23,
  },
  parentSection: {
    backgroundColor: '#FFF8E7',
    borderColor: '#F0D69A',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
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
});
