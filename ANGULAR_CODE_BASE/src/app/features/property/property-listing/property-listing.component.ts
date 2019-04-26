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

  isHidden = false;
  queryParams; // = '?userId='+this.userService.currentUser.user._id;

  ngOnInit() {     
    let data = this.router.snapshot && this.router.snapshot.data && this.router.snapshot.data.data || '';
    this.isHidden = false;
    if(data){
      if(data === 'all')
        this.queryParams = '?userId='+this.userService.currentUser.user._id;
      else if(data === 'available')
          this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=available';
      else if(data === 'sold')
        this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=' + data + ',acquired';
      else if(data === 'expired')
        this.queryParams = '?userId='+this.userService.currentUser.user._id + '&status=' + data;
      else this.isHidden = true;
    }
  }

}
