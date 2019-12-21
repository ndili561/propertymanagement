import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PropertyOwner } from '../../../_models/user';
import { AuthService } from '../../../services/authService';
import { AlertifyService } from '../../../services/AlertifyService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproperty-component',
  templateUrl: './addproperty.component.html'
})
export class AddPropertyComponent {
  constructor(private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  registerForm: FormGroup;
  PropertyOwner: PropertyOwner;

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required]
      
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.PropertyOwner = Object.assign({}, this.registerForm.value);

      this.authService.registerOwner(this.PropertyOwner).subscribe(
        () => {
          this.alertify.success('registered');
        },
        error => {
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.PropertyOwner).subscribe(() => {
            this.router.navigate(['/map']);
          });
        }
      );
    }
  }
  
  
}
