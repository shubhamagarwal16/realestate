import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../common/services/common.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-property',
  templateUrl: './find-property.component.html',
  styleUrls: ['./find-property.component.scss']
})
export class FindPropertyComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private route: Router
  ) { }

  propertyTypeList = [];
  cityList = [];
  propertyList = [];
  blockView = true;

  filterProperties(data){
    console.log(data);
    this.commonService.filterProperties()
    .subscribe(result => {
      console.log(result);      
    })
    // var params = new HttpParams()
    // .set('page', '2')
    // .set('page', '3')
  }

  log(data){
    console.log(data);    
  }

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
