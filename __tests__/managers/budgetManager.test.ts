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
    // 202506 (6月): 不在查詢區間內，不計算 = 0
    // 202507 (7月): 3100 * (31-30+1)/31 = 3100 * 2/31 = 200
    // 202508 (8月): 310 * 31/31 = 310 (完整月份)
    // 總計: 0 + 200 + 310 = 510
    
    // 驗證 7 月按比例計算 (2天/31天)
    const julyAmount = (3100 * 2) / 31;
    // 驗證 8 月完整計算 (31天/31天)
    const augustAmount = 310;
    const expectedTotal = julyAmount + augustAmount;
    
    console.log('實際結果:', totalAmount);
    console.log('期望結果:', expectedTotal);
    console.log('7月金額 (2天):', julyAmount);
    console.log('8月金額 (31天):', augustAmount);
    
    expect(totalAmount).toBeCloseTo(expectedTotal, 0);
    expect(totalAmount).toBeCloseTo(510, 0);
  });

  it('應該正確處理完全在區間內的月份', () => {
    // 測試完全在區間內的情況：2025/07/01 ~ 2025/08/31
    const startDate = new Date(2025, 6, 1);   // 2025年7月1日
    const endDate = new Date(2025, 7, 31);    // 2025年8月31日
    
    const totalAmount = budgetManager.getAllAmount(startDate, endDate);
    
    // 202507 (7月): 3100 * 31/31 = 3100 (完整月份)
    // 202508 (8月): 310 * 31/31 = 310 (完整月份)
    // 總計: 3100 + 310 = 3410
    
    const expectedTotal = 3100 + 310;
    expect(totalAmount).toBe(expectedTotal);
  });
});
