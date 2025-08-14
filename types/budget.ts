// Budget 類型定義
export interface Budget {
  yyyymm: string; // 年份月份格式，例如 "202412"
  amount: number; // 金額
  id?: string; // 可選的唯一標識符
  createdAt?: Date; // 可選的創建時間
  updatedAt?: Date; // 可選的更新時間
}

// Budget 統計信息
export interface BudgetStats {
  totalAmount: number; // 總預算金額
  averageAmount: number; // 平均預算金額
  monthCount: number; // 月份數量
}

// Budget 創建/更新請求
export interface BudgetRequest {
  yyyymm: string;
  amount: number;
}

// Budget 響應
export interface BudgetResponse {
  success: boolean;
  data?: Budget;
  message?: string;
  error?: string;
}
