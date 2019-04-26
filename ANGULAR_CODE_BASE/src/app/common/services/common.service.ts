import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {

  constructor(
    private http: HttpClient,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Header alert text
  HeaderMessage = new Subject<string>();
  HeaderMessage$ = this.HeaderMessage.asObservable();

  changeHeaderMessage(data) {
    this.HeaderMessage.next(data);
  }
  // Header alert text

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false){
    this.togglePageLoader.next(data);
  }

  // showLoader() { this.togglePageLoader.next(true); }
  // hideLoader() { this.togglePageLoader.next(false); }

  main_url = 'http://localhost:8080';
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

  getSingleProperty(propertySlug){
    return this.http.get(this.base_url + '/property/single/' + propertySlug);
  }

  filterProperties(param = ''){
    return this.http.get(this.base_url + '/property/filter' + param );
  }

}
