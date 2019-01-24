import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService } from '../../services/common.service';
// import { PropertyService } from '../../services/property.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit, OnChanges {

  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private userService: UserService,
    // private propertyService: PropertyService
  ) { }

  // @Input('listType') listType: string;
  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;

  propertyList = [];

  getPropertyList(params:any = ''){
    this.commonService.togglePageLoaderFn(true);
    if(this.hideOwnProperty && this.userService.currentUser.user._id) params = this.queryParams ? `${params}&notUserId=${this.userService.currentUser.user._id}` : `?notUserId=${this.userService.currentUser.user._id}`;
    console.log('final query ', params);
    this.commonService.filterProperties(params)
      .subscribe((result: any) => {
        if(result) this.propertyList = result;               
        console.log('propertyList: ', this.propertyList);
      }, (err) => console.log({err}),
    () => this.commonService.togglePageLoaderFn(false) );
      
  }

  ngOnInit() {
    this.getPropertyList(this.queryParams);
  }

  ngOnChanges() {    
    this.getPropertyList(this.queryParams);
  }

}
