import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  

  showPass: boolean = false;
  isReadyToSend : boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(){
    this.initializeFor();
  }

  initializeFor(){
    this.loginForm  = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe((v : any) => {
      this.isReadyToSend = this.loginForm.valid;
    });
  }

  /**
  * Intercambia el tipo input entre password y text
  * @param {any} input
  */
  showPassword(input: any): void {
    this.showPass = !this.showPass;
    input.type = input.type == 'password' ? 'text' : 'password';
  }

  doLogin(){
    console.log("LOGIN")
    this.router.navigate(['students']);
  }

}
