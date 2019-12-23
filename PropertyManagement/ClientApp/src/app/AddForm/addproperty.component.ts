import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PropertyOwner } from '../../../_models/user';
import { AuthService } from '../../../services/authService';
import { AlertifyService } from '../../../services/AlertifyService';
import { Router } from '@angular/router';
import { } from 'google-maps';


 
@Component({
  selector: 'app-addproperty-component',
  templateUrl: './addproperty.component.html'
})
export class AddPropertyComponent {
  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  registerForm: FormGroup;
  PropertyOwner: PropertyOwner;
  autocomplete: google.maps.places.Autocomplete;
  place: string;

  ngOnInit() {
    this.createRegisterForm();
  }

  ngAfterContentInit() {
    var RomeBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(41.940, 12.620)
      );
      
    var options = {
      bounds: RomeBounds,
      componentRestrictions: { country: 'it' },
      strictBounds: false,
    };

    var input = document.getElementById('address');
    this.autocomplete = new google.maps.places.Autocomplete(input as HTMLInputElement, options);

  }



  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Notes: ['']
     
      
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.PropertyOwner = Object.assign({}, this.registerForm.value);

      this.authService.registerOwner(this.PropertyOwner).subscribe(
        () => {
          this.alertify.success('Property Added');
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
