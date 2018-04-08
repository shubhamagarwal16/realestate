import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';

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
  blockView = { status: true, size: 6 };
  queryParams;
  filterData = {
    propertyFor: [],
    type: [],
    city: []
  };

  SidebarHiddenItem =  0;

  hideSidebarItem(num){
    if(this.SidebarHiddenItem == num)
      this.SidebarHiddenItem = 0;
    else
      this.SidebarHiddenItem = num;
  }

  manageCheckedValue(value, location, checked){
    // console.log('values: ', value, location, checked);    
    if(checked){
      this.filterData[location].push(value);
      // console.log('ss ', this.filterData[location]);
    }
    else{
      let index = this.filterData[location].indexOf(value);
      if(index > -1){
        this.filterData[location].splice(index, 1);
        // console.log('sdfd', this.filterData[location], ' index ', index);
      }      
    }    
  }

  filterProperties(data = ''){
    this.route.navigate([window.location.pathname], {
      queryParams: this.filterData
    });

    data = data + '?';
    (this.filterData.propertyFor.length > 0)?  data = data + 'propertyFor=' + this.filterData.propertyFor + '&': '';
    (this.filterData.type.length > 0)? data = data + '&type='+this.filterData.type + '&': '';
    (this.filterData.city.length > 0)? data = data + '&city='+this.filterData.city: '';
    console.log(data);

    this.queryParams = data;
  }

  uncheckAll;
  clearFilters(){
    this.route.navigate([window.location.pathname]);
    this.uncheckAll = false;
    this.queryParams = '';
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
