import { Injectable } from "@angular/core";
import { PropertyOwner } from "../_models/user";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RouterModule } from '@angular/router';
import { AuthService } from "../services/authService";
import { AlertifyService } from "../services/AlertifyService";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";




@Injectable()


export class ListResolver implements Resolve<PropertyOwner[]> {
  constructor(private userService: AuthService, private router: Router, private alertify: AlertifyService) { }
  pageNumber = 1;
  pageSize = 5;



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyOwner[]> {

    return this.userService.import(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving users data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}

