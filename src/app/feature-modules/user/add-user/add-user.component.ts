import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoleModel} from "../../../models/role.model";
import {RoleService} from "../../role/role.service";
import {UserService} from "../user.service";
import {DataConstants} from "../../../core-modules/constants/data-constants";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  roleList: Array<RoleModel> = new Array<RoleModel>();
  userForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getRoleList();
  }

  back() {
    this.router.navigate(['/home/user-list']);
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      fullname: [undefined],
      email: [undefined],
      username: [undefined],
      password: [undefined],
      role: [undefined],
      address: [undefined],
      contact: [undefined],
    });
  }

  saveUser() {
    this.userService.save(this.userForm?.value).subscribe((res) => {
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
}
