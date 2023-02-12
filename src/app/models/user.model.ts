import {BaseModel} from "./base.model";
import {RoleModel} from "./role.model";

export class UserModel extends BaseModel{
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  role?: RoleModel = new RoleModel();
  address?: string;
  contact?: string;

}
