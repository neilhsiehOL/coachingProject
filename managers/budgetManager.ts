import { Budget } from '../types/budget';

export class BudgetManager {
  private budgets: Budget[] = [];

  constructor(budgets: Budget[] = []) {
    this.budgets = budgets;
  }

  /**
   * 獲取所有預算的總金額
   * @returns 總金額
   */
  getAllAmount(): number;
  
  /**
   * 根據日期區間獲取預算總金額
   * @param startDate 開始日期
   * @param endDate 結束日期
   * @returns 區間內預算總金額
   */
  getAllAmount(startDate: Date, endDate: Date): number;
  
  /**
   * 獲取預算總金額的實現
   */
  getAllAmount(startDate?: Date, endDate?: Date): number {
    if (startDate && endDate) {
      // 日期區間查詢 - 按天數比例計算
      return this.budgets
        .map(budget => {
          const budgetDate = this.parseYyyyMmToDate(budget.yyyymm);
          const budgetYear = budgetDate.getFullYear();
          const budgetMonth = budgetDate.getMonth();
          
          // 計算該預算月份在區間內涵蓋的天數
          const coveredDays = this.calculateCoveredDays(
            budgetYear, 
            budgetMonth, 
            startDate, 
            endDate
          );
          
          if (coveredDays > 0) {
            // 獲取該月的總天數
            const totalDaysInMonth = new Date(budgetYear, budgetMonth + 1, 0).getDate();
            // 按比例計算金額
            return (budget.amount * coveredDays) / totalDaysInMonth;
          }
          return 0;
        })
        .reduce((total, amount) => total + amount, 0);
    } else {
      // 原有的無參數查詢 - 返回所有預算總額
      return this.budgets.reduce((total, budget) => total + budget.amount, 0);
    }
  }

  /**
   * 計算預算月份在日期區間內涵蓋的天數
   * @param budgetYear 預算年份
   * @param budgetMonth 預算月份 (0-11)
   * @param startDate 開始日期
   * @param endDate 結束日期
   * @returns 涵蓋的天數
   */
  private calculateCoveredDays(
    budgetYear: number, 
    budgetMonth: number, 
    startDate: Date, 
    endDate: Date
  ): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();
    
    // 如果預算月份完全不在區間內，返回 0
    if (budgetYear < startYear || budgetYear > endYear) {
      return 0;
    }
    if (budgetYear === startYear && budgetMonth < startMonth) {
      return 0;
    }
    if (budgetYear === endYear && budgetMonth > endMonth) {
      return 0;
    }
    
    // 計算該月的總天數
    const totalDaysInMonth = new Date(budgetYear, budgetMonth + 1, 0).getDate();
    
    // 計算涵蓋的開始天數
    let coveredStartDay = 1;
    if (budgetYear === startYear && budgetMonth === startMonth) {
      coveredStartDay = startDay;
    }
    
    // 計算涵蓋的結束天數
    let coveredEndDay = totalDaysInMonth;
    if (budgetYear === endYear && budgetMonth === endMonth) {
      coveredEndDay = endDay;
    }
    
    // 返回涵蓋的天數
    return coveredEndDay - coveredStartDay + 1;
  }

  /**
   * 將 yyyymm 字串轉換為 Date 物件
   * @param yyyymm 年份月份字串，格式如 "202412"
   * @returns Date 物件
   */
  private parseYyyyMmToDate(yyyymm: string): Date {
    const year = parseInt(yyyymm.substring(0, 4));
    const month = parseInt(yyyymm.substring(4, 6)) - 1; // 月份從 0 開始
    return new Date(year, month, 1); // 設定為該月的第一天
  }

  /**
   * 添加預算
   * @param budget 預算項目
   */
  addBudget(budget: Budget): void {
    this.budgets.push(budget);
  }

  /**
   * 獲取所有預算
   * @returns 預算陣列
   */
  getAllBudgets(): Budget[] {
    return [...this.budgets];
  }

  /**
   * 根據年份月份獲取預算
   * @param yyyymm 年份月份
   * @returns 預算項目或 undefined
   */
  getBudgetByMonth(yyyymm: string): Budget | undefined {
    return this.budgets.find(budget => budget.yyyymm === yyyymm);
  }

  /**
   * 更新預算
   * @param yyyymm 年份月份
   * @param newAmount 新金額
   * @returns 是否更新成功
   */
  updateBudget(yyyymm: string, newAmount: number): boolean {
    const budgetIndex = this.budgets.findIndex(budget => budget.yyyymm === yyyymm);
    if (budgetIndex !== -1) {
      this.budgets[budgetIndex].amount = newAmount;
      return true;
    }
    return false;
  }

  /**
   * 刪除預算
   * @param yyyymm 年份月份
   * @returns 是否刪除成功
   */
  deleteBudget(yyyymm: string): boolean {
    const budgetIndex = this.budgets.findIndex(budget => budget.yyyymm === yyyymm);
    if (budgetIndex !== -1) {
      this.budgets.splice(budgetIndex, 1);
      return true;
    }
    return false;
  }

  /**
   * 清空所有預算
   */
  clearAllBudgets(): void {
    this.budgets = [];
  }

  /**
   * 獲取預算數量
   * @returns 預算數量
   */
  getBudgetCount(): number {
    return this.budgets.length;
  }
}
