import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, TitleCasePipe} from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import {CoreModule} from '../core-modules/core.module';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {HeaderComponent} from '../header/header.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import {FooterComponent} from '../footer/footer.component';


@NgModule({
  declarations: [
    BaseLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AddUserComponent,
    EditUserComponent,
    UserListComponent,
    AddRoleComponent,
    EditRoleComponent,
    RoleListComponent,
    AddItemComponent,
    EditItemComponent,
    ItemListComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    CoreModule
  ],
  exports: [
    FooterComponent
  ],
  providers: [
    TitleCasePipe,
    DatePipe
  ]
})
export class FeaturesModule { }
