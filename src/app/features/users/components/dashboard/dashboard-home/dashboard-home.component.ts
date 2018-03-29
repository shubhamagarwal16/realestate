import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../common/services/user.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    
  }

}
