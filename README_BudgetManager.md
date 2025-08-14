# BudgetManager 預算管理器

這是一個功能完整的預算管理類別，提供預算的增刪改查和統計功能。

## 🚀 主要功能

### 核心方法

- **`getAllAmount()`**: 獲取所有預算的總金額
- **`addBudget(budget)`**: 添加新預算
- **`getBudgetByMonth(yyyymm)`**: 根據月份查找預算
- **`updateBudget(yyyymm, newAmount)`**: 更新預算金額
- **`deleteBudget(yyyymm)`**: 刪除指定預算
- **`getAllBudgets()`**: 獲取所有預算的副本
- **`getBudgetCount()`**: 獲取預算數量
- **`clearAllBudgets()`**: 清空所有預算

## 📖 使用方法

### 基本使用

```typescript
import { BudgetManager } from './managers/budgetManager';
import { Budget } from './types/budget';

// 創建 BudgetManager 實例
const budgetManager = new BudgetManager();

// 添加預算
const budget: Budget = {
  yyyymm: '202412',
  amount: 50000,
  id: '1'
};

budgetManager.addBudget(budget);

// 獲取總金額
const totalAmount = budgetManager.getAllAmount();
console.log(`總預算: ${totalAmount} 元`);
```

### 批量操作

```typescript
// 批量添加預算
const budgets: Budget[] = [
  { yyyymm: '202412', amount: 50000, id: '1' },
  { yyyymm: '202411', amount: 48000, id: '2' },
  { yyyymm: '202410', amount: 52000, id: '3' },
];

budgets.forEach(budget => {
  budgetManager.addBudget(budget);
});

// 獲取統計信息
console.log(`總月份數: ${budgetManager.getBudgetCount()}`);
console.log(`總金額: ${budgetManager.getAllAmount()}`);
```

### 預算管理

```typescript
// 查找特定月份預算
const decemberBudget = budgetManager.getBudgetByMonth('202412');
if (decemberBudget) {
  console.log(`12月預算: ${decemberBudget.amount} 元`);
}

// 更新預算
const updateSuccess = budgetManager.updateBudget('202412', 60000);
if (updateSuccess) {
  console.log('預算更新成功');
}

// 刪除預算
const deleteSuccess = budgetManager.deleteBudget('202409');
if (deleteSuccess) {
  console.log('預算刪除成功');
}
```

## 🧪 單元測試

專案包含完整的單元測試，涵蓋所有功能和邊界情況：

### 運行測試

```bash
# 運行所有測試
npm test

# 運行特定測試文件
npm test -- --testPathPattern=budgetManager.test.ts

# 監視模式
npm test -- --watch
```

### 測試覆蓋範圍

- ✅ **getAllAmount()**: 總金額計算測試
- ✅ **addBudget()**: 添加預算測試
- ✅ **getBudgetByMonth()**: 月份查找測試
- ✅ **updateBudget()**: 預算更新測試
- ✅ **deleteBudget()**: 預算刪除測試
- ✅ **getBudgetCount()**: 數量統計測試
- ✅ **clearAllBudgets()**: 清空預算測試
- ✅ **getAllBudgets()**: 數據副本測試
- ✅ **邊界情況**: 空陣列、大量數據、特殊金額等

## 📊 數據結構

### Budget 介面

```typescript
interface Budget {
  yyyymm: string;     // 年份月份，格式: "202412"
  amount: number;      // 金額（數字）
  id?: string;         // 可選的唯一標識符
  createdAt?: Date;    // 可選的創建時間
  updatedAt?: Date;    // 可選的更新時間
}
```

### 日期格式說明

- `yyyymm` 使用 6 位數字格式
- 前 4 位是年份（如 "2024"）
- 後 2 位是月份（如 "12"）
- 完整格式示例："202412" 表示 2024年12月

## 🔧 進階用法

### 自定義初始化

```typescript
// 使用現有數據初始化
const existingBudgets: Budget[] = [
  { yyyymm: '202412', amount: 50000, id: '1' },
  { yyyymm: '202411', amount: 48000, id: '2' },
];

const budgetManager = new BudgetManager(existingBudgets);
```

### 數據驗證

```typescript
// 檢查月份是否存在
const hasBudget = budgetManager.getBudgetByMonth('202412') !== undefined;

// 檢查金額是否為正數
const isValidAmount = (amount: number) => amount >= 0;
```

### 批量操作

```typescript
// 批量更新
const updates = [
  { yyyymm: '202412', newAmount: 60000 },
  { yyyymm: '202411', newAmount: 50000 },
];

updates.forEach(({ yyyymm, newAmount }) => {
  budgetManager.updateBudget(yyyymm, newAmount);
});
```

## 📁 文件結構

```
managers/
├── budgetManager.ts          # 主要管理器類別
types/
├── budget.ts                 # 類型定義
__tests__/
├── managers/
│   └── budgetManager.test.ts # 單元測試
examples/
├── budgetManagerExample.ts   # 使用示例
```

## ⚠️ 注意事項

1. **數據完整性**: 確保 `yyyymm` 格式正確（6位數字）
2. **金額類型**: `amount` 必須是數字類型
3. **ID 唯一性**: 建議為每個預算項目提供唯一的 `id`
4. **數據副本**: `getAllBudgets()` 返回數據副本，修改不會影響原始數據
5. **錯誤處理**: 所有方法都包含適當的錯誤處理邏輯

## 🚀 性能特點

- **時間複雜度**: 
  - 查找: O(n)
  - 添加: O(1)
  - 刪除: O(n)
  - 更新: O(n)
- **空間複雜度**: O(n)
- **記憶體管理**: 自動管理預算數據的生命週期

## 🔮 未來擴展

- [ ] 索引優化（提升查找性能）
- [ ] 數據持久化
- [ ] 預算分類管理
- [ ] 預算歷史記錄
- [ ] 數據導出功能
- [ ] 批量操作優化

## 📞 技術支援

如有問題或建議，請聯繫開發團隊或查看測試文件了解詳細用法。

---

**版本**: 1.0.0  
**更新日期**: 2024年12月  
**測試狀態**: ✅ 24/24 測試通過
