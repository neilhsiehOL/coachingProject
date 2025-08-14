import { BudgetManager } from '../../managers/budgetManager';
import { Budget } from '../../types/budget';

describe('BudgetManager - 按天數比例計算測試', () => {
  let budgetManager: BudgetManager;

  beforeEach(() => {
    // 準備測試數據：包含 2024 年 9-12 月的預算
    const mockBudgets: Budget[] = [
      { yyyymm: '202409', amount: 45000, id: '1' },
      { yyyymm: '202410', amount: 52000, id: '2' },
      { yyyymm: '202411', amount: 48000, id: '3' },
      { yyyymm: '202412', amount: 50000, id: '4' },
    ];
    
    budgetManager = new BudgetManager(mockBudgets);
  });

  it('應該按天數比例計算 2024/10/16 ~ 2024/11/30 區間內的預算總額', () => {
    // 設定測試日期區間：2024年10月16日 ~ 2024年11月30日
    const startDate = new Date(2024, 9, 16);  // 月份從 0 開始，所以 9 = 10月
    const endDate = new Date(2024, 10, 30);   // 月份從 0 開始，所以 10 = 11月
    
    // 呼叫新的按天數比例計算方法
    const totalAmount = budgetManager.getAllAmount(startDate, endDate);
    
    // 計算期望結果：
    // 202410 (10月): 52000 * (31-16+1)/31 = 52000 * 16/31 = 26838.71...
    // 202411 (11月): 48000 * 30/30 = 48000 (完整月份)
    // 總計約: 26838.71 + 48000 = 74838.71...
    
    // 由於浮點數精度問題，我們檢查結果是否在合理範圍內
    expect(totalAmount).toBeGreaterThan(74800);
    expect(totalAmount).toBeLessThan(74900);
    
    // 驗證 10 月按比例計算 (16天/31天)
    const octoberAmount = (52000 * 16) / 31;
    // 驗證 11 月完整計算 (30天/30天)
    const novemberAmount = 48000;
    const expectedTotal = octoberAmount + novemberAmount;
    
    expect(totalAmount).toBeCloseTo(expectedTotal, 0);
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
