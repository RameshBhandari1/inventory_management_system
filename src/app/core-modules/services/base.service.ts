import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {DataConstants} from '../constants/data-constants';
import {RoleModel} from '../../models/role.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected constructor(protected local: LocalStorageService) {
  }

  getAll(key: any, modelType: T): Observable<any> {
    let data = localStorage.getItem(key);
    return of(data ? JSON.parse(data) : new Array<typeof modelType>());
  }

  delete(id: any, key: any, modelType: T): Observable<any> {
    let userConfirmation = confirm('Are you sure want to delete from the system ?');
    if (userConfirmation) {
      let allItem: any[] = [];
      this.getAll(key, modelType).subscribe(res => {
        allItem = res;
        const currentObjeIndex = allItem.findIndex((v?: any) => v.id == id);
        allItem.splice(currentObjeIndex, 1);
        localStorage.setItem(key, JSON.stringify(allItem));
        return of({success: true, msg: 'Record Deleted Successfully !'});
      });
      return of({success: true, msg: 'Record Deleted Successfully !'});
    }
    return of();
  }
  getById(id: any, key: any, modelType: T): Observable<any> {
    let allItem;
    let finalData = {};
    this.getAll(key, modelType).subscribe(res => {
      allItem = res;
      const currentObjeIndex = allItem.findIndex((v?: any) => v.id == id);
      finalData = allItem[currentObjeIndex];
      return of(finalData);
    });
    return of(finalData);
  }

  editExistingDetails(key: string, value: any, model: T): Observable<any> {
    let existingDetails: any[] = [];
    this.getAll(key, model).subscribe((res) => {
      existingDetails = res;
    });
    if (existingDetails?.length) {
      existingDetails = existingDetails?.map((v: any) => {
        if(v?.id == value?.id) {
          v = value;
        }
        return v;
      });
      localStorage.setItem(key, JSON.stringify(existingDetails));
      return of({success: true, msg: 'Record Edited Successfully !'});
    } else {
      return of({success: false, msg: 'Unable to Edit Record Successfully !'});
    }
  }
}
