import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { HttpClient } from '@angular/common/http';
import { environment } from '@sa-environments/environment';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get currentUser() {
    var token = localStorage.getItem('token');
    if (!token) return null;

    let jwtHelper = new JwtHelper();
    // console.log('decoded ', jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token);
  }

  getcurrentUserDetails(userId) {
    return this.http.get(environment.BASE_URL + '/user/' + userId);
  }
}
