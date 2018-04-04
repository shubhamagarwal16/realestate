import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';
import { CommonService } from '../../../../../common/services/common.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    // private commonService: CommonService
  ) { }

  ngOnInit() {
    // this.commonService.togglePageLoaderFn(false);
  }

}
