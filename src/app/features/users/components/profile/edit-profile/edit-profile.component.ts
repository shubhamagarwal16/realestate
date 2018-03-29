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

  UserDetails;
  isEditing = false;
  
  ngOnInit() {
    this.UserDetails = this.userService.currentUser.user;
    console.log(this.UserDetails);
    
  }

}
