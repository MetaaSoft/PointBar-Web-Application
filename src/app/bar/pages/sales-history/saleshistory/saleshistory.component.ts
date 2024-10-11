import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SalesHistoryService} from "../../../services/sales-history/salesHistory.service";
import {ApiResponse} from "../../../services/sales-history/saleshistorymodel";

@Component({
  selector: 'app-saleshistory',
  templateUrl: './saleshistory.component.html',
  styleUrl: './saleshistory.component.css'
})
export class SaleshistoryComponent implements  OnInit{
  salesHistory: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['employeeName', 'tableName', 'amount', 'saleDate'];

  constructor(private salesHistoryService: SalesHistoryService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.getSalesHistory();
  }

  getSalesHistory(): void {
    this.salesHistoryService.getSalesHistoryForBusiness().subscribe(
      (response: ApiResponse<any[]>) => {
        this.salesHistory = response.data;
        this.dataSource.data = this.salesHistory;
        console.log('Sales History loaded', this.salesHistory);
      },
      error => {
        console.error('Error fetching sales history', error);
      }
    );
  }
}
