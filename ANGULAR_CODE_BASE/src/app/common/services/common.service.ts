import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { environment } from '@sa-environments/environment';

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
  togglePageLoaderFn(data: boolean = false) {
    this.togglePageLoader.next(data);
  }

  // showLoader() { this.togglePageLoader.next(true); }
  // hideLoader() { this.togglePageLoader.next(false); }

  getStatelist(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/state');
  }

  getCitylist(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/cities');
  }

  getCitylistByState(stateId): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/cities/' + stateId);
  }

  getPropertyTypeList(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/property/type');
  }

  propertyList(param = '') {
    return this.http.get(environment.BASE_URL + '/property/list/' + param);
  }

  getSingleProperty(propertySlug) {
    return this.http.get(environment.BASE_URL + '/property/single/' + propertySlug);
  }

  filterProperties(param = '') {
    return this.http.get(environment.BASE_URL + '/property/filter' + param);
  }

}
