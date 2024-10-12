import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../sales/ssalesmodel";
import {catchError, map, Observable, of, retry, tap} from "rxjs";
import {BaseService} from "../../../shared/services/base.service";
import {DashboardData} from "./dashboardmodel";
import {SalesHistoryService} from "../sales-history/salesHistory.service";
import {SalesHistoryResponse} from "../sales-history/saleshistorymodel";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private salesHistoryService: SalesHistoryService) {}

  getDashboardData(): Observable<DashboardData> {
    return this.salesHistoryService.getSalesHistoryForBusiness().pipe(
      tap(response => {
        console.log('Full raw response:', JSON.stringify(response, null, 2));
        if (!response.data || response.data.length === 0) {
          console.error('SalesHistory data is empty or undefined');
        } else {
          console.log('SalesHistory data count:', response.data.length);
        }
      }),
      map((response: ApiResponse<any[]>) => {
        if (response.success && response.data && response.data.length > 0) {
          return this.processSalesHistory(response.data);
        } else {
          console.error('Invalid or empty data from API:', response);
          throw new Error(response.message || 'Empty data from API');
        }
      }),
      tap(processedData => console.log('Processed dashboard data:', processedData))
    );
  }

  private processSalesHistory(salesHistory: any[]): DashboardData {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let salesToday = 0;
    const tablesServedToday = new Set<string>();
    let totalRevenue = 0;
    const dailySales: { [key: string]: number } = {};

    salesHistory.forEach(sale => {
      console.log('Processing sale:', sale);

      const saleDate = sale.saleDate || sale.orderDate || sale.date;

      if (!saleDate) {
        console.error('Missing date for sale:', sale);
        return;
      }

      const saleDateObj = saleDate instanceof Date ? saleDate : new Date(saleDate);
      if (isNaN(saleDateObj.getTime())) {
        console.error('Invalid date:', saleDate);
        return;
      }

      totalRevenue += sale.amount;

      if (saleDateObj.toDateString() === today.toDateString()) {
        salesToday += sale.amount;
        tablesServedToday.add(sale.tableName);
      }

      const dateKey = saleDateObj.toISOString().split('T')[0];
      dailySales[dateKey] = (dailySales[dateKey] || 0) + sale.amount;
    });

    const dailySalesArray = Object.entries(dailySales)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    console.log('Processed sales:', { salesToday, tablesServedToday, totalRevenue, dailySalesArray });

    return {
      salesToday,
      tablesServedToday: tablesServedToday.size,
      totalRevenue,
      dailySales: dailySalesArray
    };
  }
}
