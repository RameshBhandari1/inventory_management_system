import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from '../../core-modules/services/local-storage.service';
import {Router} from '@angular/router';
import {LoginResponseModel} from '../models/login-response.model';
import {DataConstants} from "../../core-modules/constants/data-constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [undefined,  Validators.compose([Validators.required])],
      password: [undefined,  Validators.compose([Validators.required])],
    })
  }


  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onUserLogin(value?: any) {
    this.submitted = true;
    if (!value?.username || !value?.password) {
      alert('Username and password is required !');
      this.submitted = false;
      return;
    }
    if (this.localStorageService.checkEitherUsernamePasswordValidOrNot(value?.username, value?.password)) {
      alert('Login Successfully !');
      let individualDetailsUsingPropertyFromObject = this.localStorageService.getIndividualDetailsUsingPropertyFromObject(DataConstants.USER, 'username', value?.username);
      const loginResponse: LoginResponseModel = new LoginResponseModel();
      loginResponse.token = btoa(value?.username.concat(new Date() + value?.password));
      loginResponse.username = value?.username;
      loginResponse.id = individualDetailsUsingPropertyFromObject?.id,
      loginResponse.role = individualDetailsUsingPropertyFromObject?.role,
      this.localStorageService.setStorageDetailsWithKeyValuePair(DataConstants.CURRENT_USER, loginResponse);
      this.router.navigate(['/home/dashboard']);
    }
  }
}
