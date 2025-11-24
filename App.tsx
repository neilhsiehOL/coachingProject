/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View, Text, Alert } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import BudgetList from './components/BudgetList';
import { Budget } from './types/budget';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  // 示例預算數據
  const budgetData: Budget[] = [
    { yyyymm: '202412', amount: 50000, id: '1' },
    { yyyymm: '202411', amount: 48000, id: '2' },
    { yyyymm: '202410', amount: 52000, id: '3' },
    { yyyymm: '202409', amount: 45000, id: '4' },
    { yyyymm: '202408', amount: 55000, id: '5' },
    { yyyymm: '202407', amount: 47000, id: '6' },
  ];

  // 處理預算點擊
  const handleBudgetPress = (budget: Budget) => {
    Alert.alert(
      '預算詳情',
      `${budget.yyyymm} 月份預算\n金額: ${new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0,
      }).format(budget.amount)}`,
      [{ text: '確定', style: 'default' }]
    );
  };

  // 處理預算刪除
  const handleBudgetDelete = (budget: Budget) => {
    Alert.alert(
      '預算已刪除',
      `已刪除 ${budget.yyyymm} 月份的預算`,
      [{ text: '確定', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>預算管理系統</Text>
        <Text style={styles.headerSubText}>管理您的月度預算</Text>
      </View>
      <BudgetList
        budgets={budgetData}
        onBudgetPress={handleBudgetPress}
        onBudgetDelete={handleBudgetDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  headerSubText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
});

export default App;
