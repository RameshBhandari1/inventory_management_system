import {BaseModel} from '../../models/base.model';
import {RoleModel} from "../../models/role.model";

export class LoginResponseModel extends BaseModel {
  username?: string;
  token?: string;
  roleName?: string;
  name?: string;
  password?: string;
  role?: RoleModel = new RoleModel();

}
