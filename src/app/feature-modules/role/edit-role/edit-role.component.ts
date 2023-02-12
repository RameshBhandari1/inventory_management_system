import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoleType} from "../../../core-modules/enums/role-type";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../role.service";
import {DataConstants} from "../../../core-modules/constants/data-constants";
import {RoleModel} from "../../../models/role.model";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  roleForm: FormGroup = new FormGroup({});
  roleList = RoleType?.enumObject().filter(val => val?.key != RoleType.SUPER_ADMIN);
  paramId: any;
  roleData: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.paramId = res.id;
    });
    this.getDetails();
    this.buildForm(this.roleData);

  }
  buildForm(data?: any) {
    this.roleForm = this.formBuilder.group({
      roleName: [data?.roleName],
      roleType: [data?.roleType],
      id: [data?.id],
      createdDate: [data?.createdDate]
    })
  }

  getDetails() {
    this.roleService.getById(this.paramId, DataConstants.ROLE, RoleModel).subscribe((res: any) => {
      this.roleData = res;
    })
  }

  saveRole() {
    this.roleService.editExistingDetails(DataConstants.ROLE, this.roleForm?.value, RoleModel).subscribe((res) => {
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
