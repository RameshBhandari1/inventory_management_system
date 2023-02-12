import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../core-modules/services/local-storage.service';
import {DataConstants} from "../core-modules/constants/data-constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem(DataConstants.CURRENT_USER) || '')?.username;
  }

  onLogoutClick(event: any) {
    let userConfirmation = confirm('Are you sure want to logout from the system ?');
    if (userConfirmation) {
      this.localStorageService.removeItemsFromStorageHavingKey(DataConstants.CURRENT_USER);
      this.router.navigate(['/auth/login']);
    }
  }
}
