import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../common/services/common.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-find-property',
  templateUrl: './find-property.component.html',
  styleUrls: ['./find-property.component.scss']
})
export class FindPropertyComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  propertyTypeList = [];
  cityList = [];
  propertyList = [];
  blockView = true;

  filterProperties(data){
    console.log(data);
    
    var params = new HttpParams()
    .set('page', '2')
    .set('page', '3')
  }

  // getPropertyList(){
    
  // }

  ngOnInit() {
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        this.propertyTypeList = result;
      });

    this.commonService.getCitylist()
      .subscribe(result => {
        this.cityList = result;
      });
  }

}
