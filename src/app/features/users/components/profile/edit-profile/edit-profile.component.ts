import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  UserDetails: any = {
    city: { _id: '', name: '' },
    state: { _id: '', name: '' }
  };
  isEditing = false;
  
  ngOnInit() {
    let userID = this.userService.currentUser.user;
      // console.log(userID._id);
      
    this.userService.getcurrentUserDetails(userID._id)
      .subscribe(result => {
        this.UserDetails = result;
        console.log(this.UserDetails);
      })
    
  }

}
