import { Injectable } from '@angular/core';
import {DataConstants} from "../constants/data-constants";
import {RoleType} from "../enums/role-type";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  checkEitherUsernamePasswordValidOrNot(username: string, password: string): boolean {
    let storageItemsList: any[] = JSON.parse(localStorage.getItem(DataConstants.USER) || JSON.stringify(new Array<any>()));
    if (!storageItemsList.length) {
      alert('No user found with provided username or password !');
      return false;
    }
    if (!storageItemsList.filter(v => v?.username == username)?.length) {
      alert('Username not found !');
      return false;
    }
    const currentUser = storageItemsList.filter(v => v?.username == username);
    if (currentUser.find(v => v?.username == username) &&
      currentUser.find(v => atob(v?.password) !== password)) {
      alert('Invalid username or password !');
      return false;
    }
    return true;
  }

  checkIfExistDetailsByAccessKey(key: string, accessKey: string) {
    let storageItemsList: any[] = JSON.parse(localStorage.getItem(key) || JSON.stringify(new Array<any>()));
    if (!storageItemsList?.length) return;
    return storageItemsList?.find(v => v?.role[accessKey] == RoleType.SUPER_ADMIN);
  }

  setResponseDetailBasedOnKeyParameterValue(key: string, parameterValue: any) {
    let storageItemsList: any[] = JSON.parse(localStorage.getItem(key) || JSON.stringify(new Array<any>()));
    storageItemsList.push(parameterValue);
    localStorage.setItem(key, JSON.stringify(storageItemsList));
  }

  removeItemsFromStorageHavingKey(keyToBeRemove: string) {
    localStorage.removeItem(keyToBeRemove)
  }

  setStorageDetailsWithKeyValuePair(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCurrentUser(): Observable<any> {
    return of(localStorage.getItem(DataConstants.CURRENT_USER));
  }

  getIndividualDetailsUsingPropertyFromObject(currentObj: string, objProperty: string, compareAbleValue: string): any {
    let storageItemsList: any[] = JSON.parse(localStorage.getItem(currentObj) || JSON.stringify(new Array<any>()));
    if (!storageItemsList?.length) return;
    return storageItemsList?.filter(v => v[objProperty] == compareAbleValue)[0];
  }

  countStorageRecords(dataConstant: string) {
    return JSON.parse(localStorage.getItem(dataConstant) || JSON.stringify(new Array<any>()))?.length;
  }
}
