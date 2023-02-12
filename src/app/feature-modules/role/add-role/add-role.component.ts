import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleType} from "../../../core-modules/enums/role-type";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  roleForm: FormGroup = new FormGroup({});
  roleList = RoleType?.enumObject().filter(val => val?.key != RoleType.SUPER_ADMIN);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.roleForm = this.formBuilder.group({
      roleName: [undefined],
      roleType: [undefined]
    })
  }

  saveRole() {
    this.roleService.save(this.roleForm?.value).subscribe((res) => {
      alert(res?.msg);
      if (res.success) {
        this.router.navigate(['/home/role-list']);
      }
    });
  }

  back() {
    this.router.navigate(['/home/role-list']);
  }
}
