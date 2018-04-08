import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private location: Location
  ) { }

  propertyDetail;
  stateList;
  private cityList = [];
  FetchingCityList = false;
  propertyTypeList;

  getProperty(propertyId){
    this.commonService.getSingleProperty(propertyId)
      .subscribe(result => {
        console.log('propertydata: ', result);     
        this.propertyDetail = result;   
      });
  }

  getCityList(stateId){
    this.cityList = [];
    this.FetchingCityList = true;

    if(stateId != 0){
      this.commonService.getCitylistByState(stateId)
      .subscribe(response => {
        if(response.length > 0){
          this.cityList = response;
          this.FetchingCityList = false;
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  submitForm(data){

  }

  locationBack(){
    this.location.back();
  }

  ngOnInit() {
    let propertyId = this.activatedRoute.snapshot.paramMap.get('propertyId');
    console.log('propertyId: ', propertyId);

    if(propertyId)
      this.getProperty(propertyId);
    else
      console.log('not found');      

    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
      });

    this.commonService.getPropertyTypeList()
    .subscribe(result => this.propertyTypeList = result );
  }

}
