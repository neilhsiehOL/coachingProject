import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface BudgetProps {
  yyyymm: string; // 年份月份格式，例如 "202412"
  amount: number; // 金額
  onPress?: () => void; // 可選的點擊事件
}

const Budget: React.FC<BudgetProps> = ({ yyyymm, amount, onPress }) => {
  // 格式化年份月份顯示
  const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    return `${year}年${month}月`;
  };

  // 格式化金額顯示
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // 處理點擊事件
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        '預算詳情',
        `${formatDate(yyyymm)}\n預算金額: ${formatAmount(amount)}`,
        [{ text: '確定', style: 'default' }]
      );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(yyyymm)}</Text>
        <Text style={styles.dateSubText}>{yyyymm}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{formatAmount(amount)}</Text>
        <Text style={styles.amountSubText}>預算</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  dateSubText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  amountSubText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});

export default Budget;
