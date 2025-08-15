import { BudgetManager } from '../../managers/budgetManager';
import { Budget } from '../../types/budget';

describe('BudgetManager - 按天數比例計算測試', () => {
  let budgetManager: BudgetManager;

  beforeEach(() => {
    // 準備測試數據：包含 2025 年 6-8 月的預算
    const mockBudgets: Budget[] = [
      { yyyymm: '202506', amount: 30000, id: '1' },
      { yyyymm: '202507', amount: 3100, id: '2' },
      { yyyymm: '202508', amount: 310, id: '3' },
    ];
    
    budgetManager = new BudgetManager(mockBudgets);
  });

  it('應該按天數比例計算 2025/07/30 ~ 2025/08/31 區間內的預算總額', () => {
    // 設定測試日期區間：2025年7月30日 ~ 2025年8月31日
    const startDate = new Date(2025, 6, 30);  // 月份從 0 開始，所以 6 = 7月
    const endDate = new Date(2025, 7, 31);    // 月份從 0 開始，所以 7 = 8月
    
    // 呼叫新的按天數比例計算方法
    const totalAmount = budgetManager.getAllAmount(startDate, endDate);
    
    // 計算期望結果：
    // 202507 (7月): 3100 * (31-30+1)/31 = 3100 * 2/31 = 200
    // 202508 (8月): 310 * 31/31 = 310 (完整月份)
    // 總計: 200 + 310 = 510
    
    // 驗證 7 月按比例計算 (2天/31天)
    const julyAmount = (3100 * 2) / 31;
    // 驗證 8 月完整計算 (31天/31天)
    const augustAmount = 310;
    const expectedTotal = julyAmount + augustAmount;
    
    expect(totalAmount).toBeCloseTo(expectedTotal, 0);
    expect(totalAmount).toBeCloseTo(510, 0);
  });

  it('應該正確處理跨年度的日期區間', () => {
    // 測試跨年度的情況：2024/12/15 ~ 2025/01/15
    const startDate = new Date(2024, 11, 15);  // 2024年12月15日
    const endDate = new Date(2025, 0, 15);     // 2025年1月15日
    
    const totalAmount = budgetManager.getAllAmount(startDate, endDate);
    
    // 202412 (12月): 50000 * (31-15+1)/31 = 50000 * 17/31 = 27419.35...
    const decemberAmount = (50000 * 17) / 31;
    
    expect(totalAmount).toBeCloseTo(decemberAmount, 0);
  });
});
