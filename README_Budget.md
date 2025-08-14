# Budget 預算管理系統

這是一個 React Native 預算管理應用，用於管理月度預算。

## 功能特色

- 📅 **月份管理**: 使用 `yyyymm` 格式（如 "202412"）來標識年份和月份
- 💰 **金額顯示**: 支援台幣格式的金額顯示
- 📊 **統計資訊**: 顯示總預算、平均預算和月份數量
- 🎯 **互動功能**: 點擊預算項目查看詳情
- 🗑️ **刪除功能**: 支援刪除預算項目
- 📱 **響應式設計**: 適配不同螢幕尺寸

## 組件結構

### 1. Budget 組件 (`components/Budget.tsx`)
單個預算項目的顯示組件，包含：
- 年份月份顯示（格式化為 "2024年12月"）
- 金額顯示（台幣格式）
- 點擊事件處理
- 美觀的卡片式設計

### 2. BudgetList 組件 (`components/BudgetList.tsx`)
預算列表管理組件，包含：
- 多個預算項目的列表顯示
- 統計資訊（總預算、平均預算、月份數量）
- 空狀態處理
- 點擊和刪除事件處理

### 3. 類型定義 (`types/budget.ts`)
TypeScript 類型定義，包含：
- `Budget`: 預算項目介面
- `BudgetStats`: 統計資訊介面
- `BudgetRequest`: 創建/更新請求介面
- `BudgetResponse`: API 響應介面

## 使用方法

### 基本使用

```tsx
import Budget from './components/Budget';

<Budget yyyymm="202412" amount={50000} />
```

### 帶事件處理

```tsx
<Budget 
  yyyymm="202412" 
  amount={50000}
  onPress={() => console.log('預算被點擊')}
/>
```

### 使用 BudgetList

```tsx
import BudgetList from './components/BudgetList';

const budgets = [
  { yyyymm: '202412', amount: 50000, id: '1' },
  { yyyymm: '202411', amount: 48000, id: '2' },
];

<BudgetList
  budgets={budgets}
  onBudgetPress={(budget) => console.log('點擊:', budget)}
  onBudgetDelete={(budget) => console.log('刪除:', budget)}
/>
```

## 數據格式

### Budget 物件結構

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

## 樣式特點

- 🎨 現代化的卡片設計
- 🌈 藍色主題色彩（#007AFF）
- 📱 陰影效果提升視覺層次
- 🔄 點擊反饋動畫
- 📏 響應式佈局

## 自定義選項

### 修改主題色彩

在 `components/Budget.tsx` 中修改：

```tsx
// 修改主要色彩
borderLeftColor: '#007AFF',  // 左邊框色彩
color: '#007AFF',            // 金額文字色彩
```

### 修改字體大小

```tsx
// 修改標題字體大小
fontSize: 20,                // 日期字體大小
fontSize: 22,                // 金額字體大小
```

## 注意事項

1. **日期格式**: 確保 `yyyymm` 格式正確（6位數字）
2. **金額類型**: `amount` 必須是數字類型
3. **ID 唯一性**: 建議為每個預算項目提供唯一的 `id`
4. **事件處理**: 所有事件處理函數都是可選的

## 未來擴展

- [ ] 新增預算功能
- [ ] 編輯預算功能
- [ ] 預算分類管理
- [ ] 數據持久化存儲
- [ ] 圖表統計顯示
- [ ] 預算提醒功能

## 技術棧

- React Native
- TypeScript
- React Native Safe Area Context
- 原生組件（View, Text, TouchableOpacity, Alert）

---

如有問題或建議，請聯繫開發團隊。
