import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {CoreModule} from '../core-modules/core.module';
import {FeaturesModule} from '../feature-modules/features.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        CoreModule,
        AuthRoutingModule,
        FeaturesModule
    ]
})
export class AuthModule { }
