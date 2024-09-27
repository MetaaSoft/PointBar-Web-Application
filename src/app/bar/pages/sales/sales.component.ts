import {Component, OnInit} from '@angular/core';
import {TableSpaceResponse} from "../../services/tables/tablespacemodel";
import {TableService} from "../../services/tables/table.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{
  tableSpaces: TableSpaceResponse[] = [];

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    this.loadTableSpaces();
  }

  loadTableSpaces(): void {
    this.tableService.getTableSpaces().subscribe(response => {
      if (response.success) {
        this.tableSpaces = response.data;
      }
    });
  }

  viewTables(id: number, name: string, numberOfTables: number): void {
    this.router.navigate(['/view-tables', { id, name, numberOfTables }]);
  }
}
