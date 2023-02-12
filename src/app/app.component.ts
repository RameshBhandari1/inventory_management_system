import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './core-modules/services/local-storage.service';
import {BaseModel} from './models/base.model';
import {DataConstants} from "./core-modules/constants/data-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: Object = {
    id: new BaseModel().id = 'superadmin',
    fullname: 'Super Admin',
    name: 'superadmin',
    username: 'superadmin',
    email: 'super@admin.com',
    password: btoa('superadmin@1234'),
    role: {
      "roleName": "Super Admin",
      "roleType": "SUPER_ADMIN",
      "id": 1,
      "createdDate": "2023-02-11T14:50:37.187Z",
      "createdBy": "1"
    }
  };

  constructor(
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.checkAdminDetailsAlreadyExistOrNot();
  }


  private checkAdminDetailsAlreadyExistOrNot() {
    if (!this.localStorageService.checkIfExistDetailsByAccessKey(DataConstants.USER, 'roleType')) {
      console.info('user is not present and trying to set admin user details');
      this.localStorageService.setResponseDetailBasedOnKeyParameterValue(DataConstants.USER, this.users);
    }
  }
}
