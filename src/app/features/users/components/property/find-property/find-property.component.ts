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

  filterData = {
    propertyFor: [],
    type: [],
    city: []
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
    if (this.filterData.propertyFor.length > 0)
      data = data + '/propertyFor/'+this.filterData.propertyFor;
    if (this.filterData.type.length > 0)
      data = data + '/propertyFor/'+this.filterData.type;
    if (this.filterData.city.length > 0)
      data = data + '/propertyFor/'+this.filterData.city;
    // let dat = '/propertyFor/'+this.filterData.propertyFor+'/type/'+this.filterData.type+'/city/'+this.filterData.city;
    console.log(data);
    this.commonService.filterProperties(data)
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
