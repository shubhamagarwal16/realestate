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

  propertyDetail:any = {
    type: {},
    state: {},
    city: {}
  };
  stateList;
  private cityList = [];
  FetchingCityList = false;
  propertyTypeList;
  newPropertyData: any = {};

  getProperty(propertySlug){
    this.commonService.getSingleProperty(propertySlug)
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
    console.log("submitForm: ", data);     
  }

  locationBack(){
    this.location.back();
  }

  ngOnInit() {
    let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
    // console.log('propertyId: ', propertyId);

    if(propertySlug)
      this.getProperty(propertySlug);
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
