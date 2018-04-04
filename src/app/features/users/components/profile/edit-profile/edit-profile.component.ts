import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';
import { CommonService } from '../../../../../common/services/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private commonService: CommonService
  ) { }

  userID;
  UserDetails: any = {
    city: { _id: '', name: '' },
    state: { _id: '', name: '' }
  };
  isEditing = false;
  stateList;
  private cityList = [];

  getcurrentUserDetails(userId){
    this.commonService.togglePageLoaderFn(true);
    this.userService.getcurrentUserDetails(userId)
      .subscribe(result => {
        this.UserDetails = result;
        // console.log(this.UserDetails);
        this.getCityList(result['state']._id);

        this.commonService.togglePageLoaderFn(false);
        
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

  updateProfilefn(data){
    console.log(data);    
    
    this.getcurrentUserDetails(this.userID);
  }
  
  ngOnInit() {
    this.userID = this.userService.currentUser.user._id;      
    this.getcurrentUserDetails(this.userID);

    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
    });
    
    
  }

}
