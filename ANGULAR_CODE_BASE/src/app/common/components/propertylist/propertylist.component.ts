import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit, OnChanges {

  constructor(
    private commonService: CommonService,
    private loginService: LoginService, // used in template
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) { }

  // @Input('listType') listType: string;
  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;

  propertyList = [];

  toggleImages(id, propNum, incDec, imgLen, e) {
    let ele: any = document.getElementById(id+propNum);
    let value = parseInt(ele.value) || 0;
    if (value >= (imgLen - 1)) { ele.value = incDec == '-1' ? value - 1 : 0; }
    else if (value == 0) { ele.value = incDec == '-1' ? imgLen - 1 : value + 1; }
    else { ele.value = value + incDec; }

    let imgSrc = this.propertyList[propNum].images[ele.value];
    if (imgSrc) {
      let img: any = document.getElementById('propImg' + propNum);
      img.src = this.commonService.main_url + '/api/property/showGFSImage/' + imgSrc;
    }
    //Preventing opening property view page on button click
    e.stopPropagation();
  }

  getPropertyList(params: any = '') {
    this.commonService.togglePageLoaderFn(true);
    if (this.hideOwnProperty && this.userService.currentUser && this.userService.currentUser.user._id) params = this.queryParams ? `${params}&notUserId=${this.userService.currentUser.user._id}` : `?notUserId=${this.userService.currentUser.user._id}`;
    console.log('final query ', params);
    this.commonService.filterProperties(params)
      .subscribe((result: any) => {
        if (result) this.propertyList = result;
        console.log('propertyList: ', this.propertyList);
      }, (err) => console.log({ err }),
        () => this.commonService.togglePageLoaderFn(false));

  }

  viewProperty(propertySlug) {
    this.router.navigate([`/property/view/${propertySlug}`]);
  }

  markAsSold(propertySlug, status, e) {
    if (propertySlug) {
      status = status == 'sell' ? 'sold' : 'acquired';
      this.http.post(this.commonService.base_url + `/property/markAsSold/${propertySlug}`, { status })
        .subscribe(result => {
          let data = result && result['result'] || {};
          let message = result && result['message'];
          if (data && data.nModified == 1) {
            this.commonService.changeHeaderMessage({ type: 'success', message });
            this.router.navigate([`/property/listing/sold`]);
          }
          else this.commonService.changeHeaderMessage({ type: 'danger', message });
        }, err => {
          let error = err.error;
          let message = err.error && err.error['message'];
          this.commonService.changeHeaderMessage({ type: 'danger', message });
        });
    }
    e.stopPropagation();
  }

  getFormattedDate(date) {
    return moment(date).format("MMMM Do YYYY") || '';
  }

  maxLength: Number = 0;
  setMaxLength(boxId) {
    // console.log({boxId});
    // let height = document.getElementById(boxId).offsetHeight;
    // console.log({height}, boxId);
    // (height > this.maxLength)? this.maxLength = height : null;
  }

  ngOnInit() {
    // console.log('ngOnInit');
    // this.getPropertyList(this.queryParams);
  }

  ngOnChanges() {
    this.getPropertyList(this.queryParams);
  }

}
