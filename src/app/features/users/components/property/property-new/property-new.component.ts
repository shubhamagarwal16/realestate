import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../common/services/common.service';
import { UserService } from '../../../../../common/services/user.service';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private userService: UserService
  ) { }

  propertyTypeList = [];
  stateList;
  private cityList = [];

  getPropertyTypeList(){
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        // console.log(result);
        this.propertyTypeList = result;
      });
  }

  getCityList(stateId){
    this.cityList = [];

    if(stateId != 0){
      this.commonService.getCitylistByState(stateId)
      .subscribe(response => {
        if(response.length > 0){
          this.cityList = response;
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  ngOnInit() {
    this.getPropertyTypeList();

    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
    });
  }

}
