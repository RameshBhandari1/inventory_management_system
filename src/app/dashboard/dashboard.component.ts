import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../core-modules/services/local-storage.service';
import {DataConstants} from '../core-modules/constants/data-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalRecordCount: {
    users: number, roles: number, items: number
  } = {
    users: 0, roles: 0, items: 0
  }
  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.countDataRecords();
  }

  countDataRecords() {
    this.totalRecordCount.users = this.localStorageService.countStorageRecords(DataConstants.USER);
    this.totalRecordCount.roles = this.localStorageService.countStorageRecords(DataConstants.ROLE);
    this.totalRecordCount.items = this.localStorageService.countStorageRecords(DataConstants.ITEM);
  }

}
