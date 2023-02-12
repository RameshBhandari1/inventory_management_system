import { Component, OnInit } from '@angular/core';
import {RoleModel} from "../../../models/role.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../role/role.service";
import {UserService} from "../user.service";
import {DataConstants} from "../../../core-modules/constants/data-constants";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  roleList: Array<RoleModel> = new Array<RoleModel>();
  userForm: FormGroup = new FormGroup({});
  paramId: any;
  userData: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.paramId = res.id;
    });
    this.getDetails();
    this.buildForm(this.userData);
    this.getRoleList();
  }

  buildForm(data?: any) {
    this.userForm = this.formBuilder.group({
      id: [data?.id],
      fullname: [data?.fullname],
      email: [data?.email],
      username: [data?.username],
      password: [data?.password],
      role: [data?.role?.roleName],
      address: [data?.address],
      contact: [data?.contact],
    });
  }

  saveUser() {
    this.userService.editExistingDetails(DataConstants.USER, this.userForm?.value, UserModel).subscribe((res) => {
      alert(res?.msg);
      if (res.success) {
        this.router.navigate(['/home/user-list']);
      }
    });
  }

  getRoleList() {
    this.roleService.getAll(DataConstants.ROLE, RoleModel).subscribe((res) => {
      this.roleList = res;
    })
  }

  getDetails() {
    this.roleService.getById(this.paramId, DataConstants.USER, UserModel).subscribe((res: any) => {
      this.userData = res;
    })
  }

  back() {
    this.router.navigate(['/home/user-list']);
  }
}
