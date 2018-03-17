import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  base_url = 'http://127.0.0.1:8000';

  getStatelist(): Observable<any>{
    return this.http.get(this.base_url+ '/common/statelist');
    // .subscribe(response => {
    //   console.log('-- ', response, response['statelist']);
    //   return response['statelist'];
    // });
  }

  getCitylistByState(stateId): Observable<any>{
    return this.http.get(this.base_url+ '/common/citylist/'+stateId );
  }

}
