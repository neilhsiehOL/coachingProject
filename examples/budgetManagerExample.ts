import { BudgetManager } from '../managers/budgetManager';
import { Budget } from '../types/budget';

// 使用示例
export function budgetManagerExample() {
  console.log('=== BudgetManager 使用示例 ===\n');

  // 1. 創建 BudgetManager 實例
  const budgetManager = new BudgetManager();

  // 2. 添加一些預算數據
  const budgets: Budget[] = [
    { yyyymm: '202412', amount: 50000, id: '1' },
    { yyyymm: '202411', amount: 48000, id: '2' },
    { yyyymm: '202410', amount: 52000, id: '3' },
    { yyyymm: '202409', amount: 45000, id: '4' },
  ];

  budgets.forEach(budget => {
    budgetManager.addBudget(budget);
    console.log(`✅ 已添加 ${budget.yyyymm} 月份預算: ${budget.amount.toLocaleString('zh-TW')} 元`);
  });

  console.log('\n--- 基本功能展示 ---');

  // 3. 獲取所有預算的總金額
  const totalAmount = budgetManager.getAllAmount();
  console.log(`💰 總預算金額: ${totalAmount.toLocaleString('zh-TW')} 元`);

  // 4. 獲取預算數量
  const budgetCount = budgetManager.getBudgetCount();
  console.log(`📊 預算月份數量: ${budgetCount} 個月`);

  // 5. 根據月份查找預算
  const decemberBudget = budgetManager.getBudgetByMonth('202412');
  if (decemberBudget) {
    console.log(`📅 2024年12月預算: ${decemberBudget.amount.toLocaleString('zh-TW')} 元`);
  }

  // 6. 更新預算
  const updateSuccess = budgetManager.updateBudget('202412', 60000);
  if (updateSuccess) {
    console.log(`🔄 已更新 2024年12月預算為: 60,000 元`);
    
    // 重新獲取總金額
    const newTotalAmount = budgetManager.getAllAmount();
    console.log(`💰 更新後總預算金額: ${newTotalAmount.toLocaleString('zh-TW')} 元`);
  }

  // 7. 添加新預算
  budgetManager.addBudget({ yyyymm: '202408', amount: 55000, id: '5' });
  console.log(`➕ 已添加 2024年8月預算: 55,000 元`);

  // 8. 最終統計
  console.log('\n--- 最終統計 ---');
  console.log(`📊 總月份數: ${budgetManager.getBudgetCount()}`);
  console.log(`💰 總預算金額: ${budgetManager.getAllAmount().toLocaleString('zh-TW')} 元`);
  
  const allBudgets = budgetManager.getAllBudgets();
  console.log('\n📋 所有預算列表:');
  allBudgets.forEach(budget => {
    console.log(`  ${budget.yyyymm}: ${budget.amount.toLocaleString('zh-TW')} 元`);
  });

  // 9. 刪除預算示例
  console.log('\n--- 刪除預算示例 ---');
  const deleteSuccess = budgetManager.deleteBudget('202409');
  if (deleteSuccess) {
    console.log(`🗑️ 已刪除 2024年9月預算`);
    console.log(`📊 刪除後月份數: ${budgetManager.getBudgetCount()}`);
    console.log(`💰 刪除後總金額: ${budgetManager.getAllAmount().toLocaleString('zh-TW')} 元`);
  }

  // 10. 清空所有預算
  console.log('\n--- 清空預算示例 ---');
  budgetManager.clearAllBudgets();
  console.log(`🧹 已清空所有預算`);
  console.log(`📊 清空後月份數: ${budgetManager.getBudgetCount()}`);
  console.log(`💰 清空後總金額: ${budgetManager.getAllAmount().toLocaleString('zh-TW')} 元`);

  console.log('\n=== 示例結束 ===');
}

// 邊界情況測試示例
export function boundaryTestExample() {
  console.log('\n=== 邊界情況測試示例 ===\n');

  const budgetManager = new BudgetManager();

  // 測試空陣列
  console.log('1. 空陣列測試:');
  console.log(`   預算數量: ${budgetManager.getBudgetCount()}`);
  console.log(`   總金額: ${budgetManager.getAllAmount()}`);

  // 測試單一預算
  console.log('\n2. 單一預算測試:');
  budgetManager.addBudget({ yyyymm: '202412', amount: 1000, id: '1' });
  console.log(`   預算數量: ${budgetManager.getBudgetCount()}`);
  console.log(`   總金額: ${budgetManager.getAllAmount()}`);

  // 測試零金額
  console.log('\n3. 零金額測試:');
  budgetManager.addBudget({ yyyymm: '202411', amount: 0, id: '2' });
  console.log(`   預算數量: ${budgetManager.getBudgetCount()}`);
  console.log(`   總金額: ${budgetManager.getAllAmount()}`);

  // 測試負數金額
  console.log('\n4. 負數金額測試:');
  budgetManager.addBudget({ yyyymm: '202410', amount: -500, id: '3' });
  console.log(`   預算數量: ${budgetManager.getBudgetCount()}`);
  console.log(`   總金額: ${budgetManager.getAllAmount()}`);

  // 測試小數金額
  console.log('\n5. 小數金額測試:');
  budgetManager.addBudget({ yyyymm: '202409', amount: 123.45, id: '4' });
  console.log(`   預算數量: ${budgetManager.getBudgetCount()}`);
  console.log(`   總金額: ${budgetManager.getAllAmount()}`);

  console.log('\n=== 邊界情況測試結束 ===');
}
