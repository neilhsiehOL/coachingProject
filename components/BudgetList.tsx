import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Budget from './Budget';
import { Budget as BudgetType } from '../types/budget';

interface BudgetListProps {
  budgets: BudgetType[];
  onBudgetPress?: (budget: BudgetType) => void;
  onBudgetDelete?: (budget: BudgetType) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ 
  budgets, 
  onBudgetPress, 
  onBudgetDelete: _onBudgetDelete,
}) => {
  // 計算統計信息
  const calculateStats = () => {
    if (budgets.length === 0) return { total: 0, average: 0 };
    
    const total = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const average = total / budgets.length;
    
    return { total, average };
  };

  const stats = calculateStats();

  // 處理預算點擊
  const handleBudgetPress = (budget: BudgetType) => {
    if (onBudgetPress) {
      onBudgetPress(budget);
    }
  };

  // 渲染統計信息
  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>總預算</Text>
        <Text style={styles.statValue}>
          {new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0,
          }).format(stats.total)}
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>平均預算</Text>
        <Text style={styles.statValue}>
          {new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0,
          }).format(stats.average)}
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>月份數量</Text>
        <Text style={styles.statValue}>{budgets.length}</Text>
      </View>
    </View>
  );

  // 渲染預算項目
  const renderBudgetItem = ({ item }: { item: BudgetType }) => (
    <Budget
      yyyymm={item.yyyymm}
      amount={item.amount}
      onPress={() => handleBudgetPress(item)}
    />
  );

  // 渲染空狀態
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>目前沒有預算資料</Text>
      <Text style={styles.emptySubText}>點擊下方按鈕新增預算</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {budgets.length > 0 && renderStats()}
      <FlatList
        data={budgets}
        renderItem={renderBudgetItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default BudgetList;
