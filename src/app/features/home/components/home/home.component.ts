import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { UserService } from '../../../../common/services/user.service';
import { CommonService } from '../../../../common/services/common.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: Array<string>;
  cityList = []; 
  //  = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  // 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  // 'Guam', 'Hawaii', 'Idaho' ];
  propertyTypeList;

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router    
  ) {}

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] : this.cityList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  ngOnInit() {
    this._http.get('https://picsum.photos/list')
      .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
      .subscribe(images => {
        this.images = images;
        console.log(images);          
      });

    this.commonService.getCitylist()
      .subscribe(response => {
        console.log(response);
        response.forEach(element => {
          this.cityList.push(element.name);
        });
      });

    this.commonService.getPropertyTypeList()
      .subscribe(response => {
        console.log(response);
        this.propertyTypeList = response;
      });  
  }

  searchPropData = {
    location: ''
  }

  postAprop(){
    console.log('post a prop');    
    this.router.navigate(['/users/property/new'])
  }
  
  searchProp(value){
    console.log(value);    
  }

  queryParams = '?status=available';  

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

}
