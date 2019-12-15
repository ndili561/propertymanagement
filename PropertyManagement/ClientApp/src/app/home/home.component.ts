import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../../ClientApp/_models/user'
import { Router } from '@angular/router';
import { AuthService } from '../../../../ClientApp/services/authService'
import { AlertifyService } from '../../../../ClientApp/services/AlertifyService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  user: User;
  registerForm: FormGroup;


  ngOnInit() {

    this.createRegisterForm();
  }

  createRegisterForm() {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  register() {   
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
       () => {
            this.alertify.success('registered');
       },
       error => {
        this.alertify.error(error);
       }, () => {
         this.authService.login(this.user).subscribe(() => {
           this.router.navigate(['/members']);
        });
       }
      );
    }
  }
 
}
