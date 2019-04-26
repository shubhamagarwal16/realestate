import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../../common/services/common.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }

  userList = [];

  getUserList() {
    this.http.get(`${this.commonService.base_url}/auth/admin/userList`)
      .subscribe((response: any) => {
        if (response && response.data) this.userList = response.data
      },
        () => { },
        () => { this.commonService.togglePageLoaderFn(false); }
      )
  }

  changePass(_id, password){
    console.log('zx, dsf ', _id, password);
    this.http.put(`${this.commonService.base_url}/auth/admin/changePass`, { _id, password })
    .subscribe(resp => {
      console.log({resp});
    })
  }

  ngOnInit() {
    this.getUserList();
  }

}
