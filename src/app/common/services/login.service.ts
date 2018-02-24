import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

  checkUserLogin(data){
    console.log(' service logg ', data);
    return data
  }

}
