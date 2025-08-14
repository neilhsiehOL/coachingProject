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
  getAllAmount(): number {
    return this.budgets.reduce((total, budget) => total + budget.amount, 0);
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
