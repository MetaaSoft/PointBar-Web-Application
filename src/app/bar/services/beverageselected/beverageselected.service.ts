import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeverageselectedService {

  private beverageSelectedSource = new Subject<any>();
  beverageSelected$ = this.beverageSelectedSource.asObservable();

  selectBeverage(beverage: any) {
    this.beverageSelectedSource.next(beverage);
  }
}
