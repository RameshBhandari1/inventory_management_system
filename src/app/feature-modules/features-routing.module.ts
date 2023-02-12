import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {BaseLayoutComponent} from './base-layout/base-layout.component';
import {AddUserComponent} from "./user/add-user/add-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {EditRoleComponent} from "./role/edit-role/edit-role.component";
import {EditItemComponent} from "./item/edit-item/edit-item.component";
import {RoleListComponent} from "./role/role-list/role-list.component";
import {AddRoleComponent} from "./role/add-role/add-role.component";
import {ItemListComponent} from "./item/item-list/item-list.component";
import {AddItemComponent} from "./item/add-item/add-item.component";

const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'user-list', component: UserListComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'role-list', component: RoleListComponent},
      {path: 'add-role', component: AddRoleComponent},
      {path: 'edit-role/:id', component: EditRoleComponent},
      {path: 'item-list', component: ItemListComponent},
      {path: 'add-item', component: AddItemComponent},
      {path: 'edit-item/:id', component: EditItemComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
