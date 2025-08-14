import { BudgetManager } from '../../managers/budgetManager';
import { Budget } from '../../types/budget';

describe('BudgetManager', () => {
  let budgetManager: BudgetManager;
  let mockBudgets: Budget[];

  beforeEach(() => {
    // 準備測試數據
    mockBudgets = [
      { yyyymm: '202412', amount: 50000, id: '1' },
      { yyyymm: '202411', amount: 48000, id: '2' },
      { yyyymm: '202410', amount: 52000, id: '3' },
      { yyyymm: '202409', amount: 45000, id: '4' },
    ];
    
    budgetManager = new BudgetManager(mockBudgets);
  });

  afterEach(() => {
    // 清理測試數據
    budgetManager.clearAllBudgets();
  });

  describe('getAllAmount', () => {
    it('應該返回所有預算的總金額', () => {
      // 計算期望的總金額：50000 + 48000 + 52000 + 45000 = 195000
      const expectedTotal = 195000;
      const actualTotal = budgetManager.getAllAmount();
      
      expect(actualTotal).toBe(expectedTotal);
    });

    it('當沒有預算時應該返回 0', () => {
      budgetManager.clearAllBudgets();
      const total = budgetManager.getAllAmount();
      
      expect(total).toBe(0);
    });

    it('當只有一個預算時應該返回該預算的金額', () => {
      budgetManager.clearAllBudgets();
      budgetManager.addBudget({ yyyymm: '202412', amount: 30000, id: '1' });
      
      const total = budgetManager.getAllAmount();
      expect(total).toBe(30000);
    });

    it('應該正確處理小數金額', () => {
      budgetManager.clearAllBudgets();
      budgetManager.addBudget({ yyyymm: '202412', amount: 100.50, id: '1' });
      budgetManager.addBudget({ yyyymm: '202411', amount: 200.75, id: '2' });
      
      const total = budgetManager.getAllAmount();
      expect(total).toBe(301.25);
    });

    it('應該正確處理負數金額', () => {
      budgetManager.clearAllBudgets();
      budgetManager.addBudget({ yyyymm: '202412', amount: 1000, id: '1' });
      budgetManager.addBudget({ yyyymm: '202411', amount: -500, id: '2' });
      
      const total = budgetManager.getAllAmount();
      expect(total).toBe(500);
    });
  });

  describe('addBudget', () => {
    it('應該能夠添加新的預算', () => {
      const newBudget: Budget = { yyyymm: '202408', amount: 60000, id: '5' };
      budgetManager.addBudget(newBudget);
      
      const allBudgets = budgetManager.getAllBudgets();
      expect(allBudgets).toHaveLength(5);
      expect(allBudgets).toContainEqual(newBudget);
    });

    it('添加預算後總金額應該正確更新', () => {
      const initialTotal = budgetManager.getAllAmount();
      const newBudget: Budget = { yyyymm: '202408', amount: 60000, id: '5' };
      
      budgetManager.addBudget(newBudget);
      const newTotal = budgetManager.getAllAmount();
      
      expect(newTotal).toBe(initialTotal + 60000);
    });
  });

  describe('getBudgetByMonth', () => {
    it('應該能夠根據年份月份找到預算', () => {
      const budget = budgetManager.getBudgetByMonth('202412');
      
      expect(budget).toBeDefined();
      expect(budget?.amount).toBe(50000);
      expect(budget?.id).toBe('1');
    });

    it('當年份月份不存在時應該返回 undefined', () => {
      const budget = budgetManager.getBudgetByMonth('202401');
      
      expect(budget).toBeUndefined();
    });
  });

  describe('updateBudget', () => {
    it('應該能夠更新現有預算的金額', () => {
      const success = budgetManager.updateBudget('202412', 60000);
      
      expect(success).toBe(true);
      expect(budgetManager.getBudgetByMonth('202412')?.amount).toBe(60000);
    });

    it('更新預算後總金額應該正確更新', () => {
      const initialTotal = budgetManager.getAllAmount();
      budgetManager.updateBudget('202412', 60000);
      const newTotal = budgetManager.getAllAmount();
      
      expect(newTotal).toBe(initialTotal + 10000); // 50000 -> 60000
    });

    it('當年份月份不存在時應該返回 false', () => {
      const success = budgetManager.updateBudget('202401', 60000);
      
      expect(success).toBe(false);
    });
  });

  describe('deleteBudget', () => {
    it('應該能夠刪除指定的預算', () => {
      const success = budgetManager.deleteBudget('202412');
      
      expect(success).toBe(true);
      expect(budgetManager.getBudgetByMonth('202412')).toBeUndefined();
    });

    it('刪除預算後總金額應該正確更新', () => {
      const initialTotal = budgetManager.getAllAmount();
      budgetManager.deleteBudget('202412');
      const newTotal = budgetManager.getAllAmount();
      
      expect(newTotal).toBe(initialTotal - 50000);
    });

    it('當年份月份不存在時應該返回 false', () => {
      const success = budgetManager.deleteBudget('202401');
      
      expect(success).toBe(false);
    });
  });

  describe('getBudgetCount', () => {
    it('應該返回正確的預算數量', () => {
      expect(budgetManager.getBudgetCount()).toBe(4);
    });

    it('添加預算後數量應該增加', () => {
      const initialCount = budgetManager.getBudgetCount();
      budgetManager.addBudget({ yyyymm: '202408', amount: 60000, id: '5' });
      
      expect(budgetManager.getBudgetCount()).toBe(initialCount + 1);
    });

    it('刪除預算後數量應該減少', () => {
      const initialCount = budgetManager.getBudgetCount();
      budgetManager.deleteBudget('202412');
      
      expect(budgetManager.getBudgetCount()).toBe(initialCount - 1);
    });
  });

  describe('clearAllBudgets', () => {
    it('應該清空所有預算', () => {
      budgetManager.clearAllBudgets();
      
      expect(budgetManager.getBudgetCount()).toBe(0);
      expect(budgetManager.getAllAmount()).toBe(0);
    });
  });

  describe('getAllBudgets', () => {
    it('應該返回所有預算的副本', () => {
      const allBudgets = budgetManager.getAllBudgets();
      
      expect(allBudgets).toEqual(mockBudgets);
      expect(allBudgets).not.toBe(mockBudgets); // 應該是副本，不是同一個引用
    });

    it('修改返回的陣列不應該影響原始數據', () => {
      const allBudgets = budgetManager.getAllBudgets();
      allBudgets.push({ yyyymm: '202408', amount: 60000, id: '5' });
      
      expect(budgetManager.getBudgetCount()).toBe(4); // 原始數據不變
      expect(allBudgets).toHaveLength(5); // 副本被修改
    });
  });

  describe('邊界情況測試', () => {
    it('應該能夠處理空陣列初始化', () => {
      const emptyManager = new BudgetManager();
      
      expect(emptyManager.getBudgetCount()).toBe(0);
      expect(emptyManager.getAllAmount()).toBe(0);
    });

    it('應該能夠處理大量預算數據', () => {
      const largeManager = new BudgetManager();
      const largeAmount = 1000000;
      
      // 添加 1000 個預算
      for (let i = 0; i < 1000; i++) {
        largeManager.addBudget({
          yyyymm: `2024${String(i + 1).padStart(2, '0')}`,
          amount: largeAmount,
          id: String(i + 1)
        });
      }
      
      expect(largeManager.getBudgetCount()).toBe(1000);
      expect(largeManager.getAllAmount()).toBe(1000 * largeAmount);
    });

    it('應該能夠處理金額為 0 的預算', () => {
      budgetManager.clearAllBudgets();
      budgetManager.addBudget({ yyyymm: '202412', amount: 0, id: '1' });
      
      expect(budgetManager.getAllAmount()).toBe(0);
    });
  });
});
