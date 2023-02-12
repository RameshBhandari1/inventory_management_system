import {Injectable} from '@angular/core';
import {RoleModel} from "../../models/role.model";
import {Observable, of} from "rxjs";
import {DataConstants} from "../../core-modules/constants/data-constants";
import {LocalStorageService} from "../../core-modules/services/local-storage.service";
import {LoginResponseModel} from "../../auth/models/login-response.model";
import {BaseService} from "../../core-modules/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<any>{

  constructor(
    override readonly local: LocalStorageService
  ) {
    super(local);
  }

  save(role: RoleModel): Observable<any> {
    let oldRole: Array<RoleModel> = new Array<RoleModel>();
    let currentUser: LoginResponseModel = new LoginResponseModel();
    this.local.getCurrentUser().subscribe(res => {
      currentUser = res;
    });
    this.getAll(DataConstants.ROLE, RoleModel).subscribe((res) => {
      oldRole = res;
    });
    if (oldRole?.length) {
      role.id = oldRole?.length + 1;
    } else {
      role.id = 1;
    }
    role.createdDate = new Date();
    role.createdBy = currentUser?.id;
    if (oldRole?.find((v?: any) => v?.roleName == role?.roleName)) {
      return of({success: false, msg: 'Role Name already exist !'});
    } else {
      oldRole.push(role);
      localStorage.setItem(DataConstants.ROLE, JSON.stringify(oldRole));
      return of({success: true, msg: 'Record Saved Successfully !'});
    }
  }
}
