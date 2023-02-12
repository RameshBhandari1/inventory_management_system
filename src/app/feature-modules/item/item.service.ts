import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {DataConstants} from "../../core-modules/constants/data-constants";
import {ItemModel} from "../../models/item.model";
import {LocalStorageService} from "../../core-modules/services/local-storage.service";
import {LoginResponseModel} from "../../auth/models/login-response.model";
import {BaseService} from "../../core-modules/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<any> {

  constructor(
    override readonly local: LocalStorageService
  ) {
    super(local);
  }

  save(item: ItemModel): Observable<any> {
    let oldItems: Array<ItemModel> = new Array<ItemModel>();
    let currentUser: LoginResponseModel = new LoginResponseModel();
    this.local.getCurrentUser().subscribe(res => {
      currentUser = res;
    });
    this.getAll(DataConstants.ITEM, ItemModel).subscribe((res) => {
      oldItems = res;
    });
    if (oldItems?.length) {
      item.id = oldItems?.length + 1;
    } else {
      item.id = 1;
    }
    item.createdDate = new Date();
    item.createdBy = currentUser?.id;
    oldItems.push(item);
    localStorage.setItem(DataConstants.ITEM, JSON.stringify(oldItems));
    return of({success: true, msg: 'Record Saved Successfully !'});
  }
}
