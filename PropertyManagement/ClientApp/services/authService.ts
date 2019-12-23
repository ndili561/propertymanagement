import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';  // https://github.com/auth0/angular2-jwt
import { environment } from 'src/environments/environment';
import { User, PropertyOwner, PaginatedResult } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  import(pageNumber?, pageSize?, userParams?, likesParam?): Observable<PaginatedResult<PropertyOwner[]>> {
    const paginatedResult: PaginatedResult<PropertyOwner[]> = new PaginatedResult<PropertyOwner[]>();

    let httpParams = new HttpParams();


    if (pageNumber != null && pageSize != null) {
      httpParams = httpParams.append('pageNumber', pageNumber);
      httpParams = httpParams.append('pageSize', pageSize);
    }

    return this.http.get<PropertyOwner[]>('/PropertyOwner/GetAsync', { observe: 'response', params: httpParams }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        const header = response.headers.get('Pagination');
        if (header != null) {
          paginatedResult.pagination = JSON.parse(header);
        }
        return paginatedResult;
      })
    );
  }


  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  registerUser(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  registerOwner(PropertyOwner: PropertyOwner) {
    return this.http.post('/propertyowner/Add', PropertyOwner, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;

    localStorage.removeItem('user');
    this.currentUser = null;
  }
}

