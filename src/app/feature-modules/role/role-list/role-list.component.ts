import { Component, OnInit } from '@angular/core';
import {RoleModel} from "../../../models/role.model";
import {Router} from "@angular/router";
import {RoleService} from "../role.service";
import {DataConstants} from "../../../core-modules/constants/data-constants";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roleList: Array<RoleModel> = new Array<RoleModel>();

  constructor(
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getAllList();
  }

  editRole(role: any) {
    this.router.navigate(['/home/edit-role', role.id]);
  }

  addRole() {
  this.router.navigate(['/home/add-role'])
  }

  private getAllList() {
    this.roleService.getAll(DataConstants.ROLE, RoleModel).subscribe((res) => {
      this.roleList = res;
    });
  }

  onDeleteRecord(id: any) {
    this.roleService.delete(id, DataConstants.ROLE, RoleModel).subscribe();
    this.getAllList();
  }
}
