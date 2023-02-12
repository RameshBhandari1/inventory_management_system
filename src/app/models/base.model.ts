export class BaseModel {
  private _id: any;
  createdDate?: Date = new Date();
  createdBy?: string;


  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = btoa(value);
  }
}
