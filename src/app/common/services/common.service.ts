import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:8080/api';

  getStatelist(): Observable<any>{
    return this.http.get(this.base_url+ '/common/state');
  }

  getCitylist(): Observable<any>{
    return this.http.get(this.base_url+ '/common/cities');
  }

  getCitylistByState(stateId): Observable<any>{
    return this.http.get(this.base_url+ '/common/cities/'+stateId );
  }

  getPropertyTypeList(): Observable<any>{
    return this.http.get(this.base_url + '/property/type');
  }

  propertyList(param = ''){
    return this.http.get(this.base_url + '/property/list/' + param);
  }

  filterProperties(param = ''){
    return this.http.post(this.base_url + '/property/filter', param);
  }

}
