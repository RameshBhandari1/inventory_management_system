import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {DataConstants} from "../../../core-modules/constants/data-constants";
import {RoleType} from "../../../core-modules/enums/role-type";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: Array<UserModel> = new Array<UserModel>();
  currentUser?: UserModel = new UserModel();
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserList();
    this.currentUser = JSON.parse(localStorage.getItem(DataConstants.CURRENT_USER) || '') || new UserModel();
  }

  editUser(user: UserModel) {
    this.router.navigate(['/home/edit-user', user?.id]);
  }

  addUser() {
    this.router.navigate(['/home/add-user']);
  }

  private getUserList() {
    this.userService.getAll(DataConstants.USER, UserModel).subscribe((res) => {
      this.userList = res;
    });
  }

  onDeleteRecord(id: any) {
    this.userService.delete(id, DataConstants.USER, UserModel).subscribe();
    this.getUserList();
  }
}
