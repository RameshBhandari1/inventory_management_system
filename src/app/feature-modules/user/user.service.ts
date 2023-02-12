import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserModel} from "../../models/user.model";
import {DataConstants} from "../../core-modules/constants/data-constants";
import {LoginResponseModel} from "../../auth/models/login-response.model";
import {LocalStorageService} from "../../core-modules/services/local-storage.service";
import {BaseService} from "../../core-modules/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any>{

  constructor(
    override readonly local: LocalStorageService
  ) {
    super(local);
  }
  save(user: UserModel): Observable<any> {
    let oldUser: Array<UserModel> = new Array<UserModel>();
    let currentUser: LoginResponseModel = new LoginResponseModel();
    this.local.getCurrentUser().subscribe(res => {
      currentUser = res;
    });
    this.getAll(DataConstants.USER, UserModel).subscribe((res) => {
      oldUser = res;
    });
    if (oldUser?.length) {
      user.id = oldUser?.length + 1;
    } else {
      user.id = 1;
    }
    user.createdDate = new Date();
    user.createdBy = currentUser?.id;
    if (oldUser?.find((v?: any) => v?.username == user?.username)) {
      return of({success: false, msg: 'User already exist !'});
    } else {
      user.password = btoa(<string>user.password);
      oldUser.push(user);
      localStorage.setItem(DataConstants.USER, JSON.stringify(oldUser));
      return of({success: true, msg: 'Record Saved Successfully !'});
    }
  }
}
