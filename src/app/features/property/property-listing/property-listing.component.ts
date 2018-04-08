import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) { }

  queryParams; // = '?userId='+this.userService.currentUser.user._id;

  ngOnInit() {
    console.log(this.router.snapshot.data.data);     
    let data = this.router.snapshot.data.data;
    if(data){
      if(data === 'all')
        this.queryParams = '?userId='+this.userService.currentUser.user._id;
      else if(data === 'active')
          this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=' + data + ',available';
      else if(data === 'sold')
        this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=' + data + ',rented';
      else if(data === 'expired')
        this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=' + data;
    }
  }

}
