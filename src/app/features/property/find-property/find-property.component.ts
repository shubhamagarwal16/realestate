import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-find-property',
  templateUrl: './find-property.component.html',
  styleUrls: ['./find-property.component.scss']
})
export class FindPropertyComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  propertyTypeList = [];
  cityList = [];
  propertyList = [];
  blockView = { status: true, size: 6 };
  queryParams = '';
  filterData = {
    propertyFor: [],
    type: [],
    city: []
  };

  SidebarHiddenItem = 0;

  hideSidebarItem(num) {
    if (this.SidebarHiddenItem == num)
      this.SidebarHiddenItem = 0;
    else
      this.SidebarHiddenItem = num;
  }

  manageCheckedValue(value, location, checked) {
    if (checked) {
      this.filterData[location].push(value);
    }
    else {
      let index = this.filterData[location].indexOf(value);
      if (index > -1) {
        this.filterData[location].splice(index, 1);
      }
    }
  }

  filterProperties(data = '') {
    var tempVar = Object.values(this.filterData).filter(e => e.length);
    if (tempVar.length) {
      this.route.navigate([window.location.pathname], {
        queryParams: this.filterData
      });
      data = data + '?';
      (this.filterData.propertyFor.length) ? data += 'propertyFor=' + this.filterData.propertyFor + '&' : '';
      (this.filterData.type.length) ? data += '&type=' + this.filterData.type + '&' : '';
      (this.filterData.city.length) ? data += '&city=' + this.filterData.city : '';
      this.queryParams = data;
    }
  }

  uncheckAll;
  clearFilters() {
    this.route.navigate([window.location.pathname]);
    this.uncheckAll = false;
    this.queryParams = '';
  }

  log(data) {
    console.log('log fn ', data);
  }

  checkCheckedValue(value, type){
    if(value && this.filterData[type]){
      var tempVar = this.filterData[type].filter(ele => ele == value ? true : false )
      return tempVar.length ? true : false;
    }
    else return false;
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
    
    this.activatedRoute.queryParams
    .subscribe(data => {
      if(data && data.propertyFor) this.filterData.propertyFor = Array.isArray(data.propertyFor)? data.propertyFor : [data.propertyFor];
      if(data && data.type) this.filterData.type = Array.isArray(data.type)? data.type : [data.type];
      if(data && data.city) this.filterData.city = Array.isArray(data.city)? data.city : [data.city];
    })
  }
}
