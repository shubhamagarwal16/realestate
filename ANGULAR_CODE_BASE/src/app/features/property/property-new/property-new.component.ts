import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../common/services/user.service';
import { CommonService } from '../../../common/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) { }

  propertyTypeList = [];
  stateList: any[];
  private cityList = [];
  FetchingCityList = false;
  imgUrls = [];
  imgsToUpload = [];
  isSubmittingForm: Boolean = false;

  getPropertyTypeList() {
    this.commonService.togglePageLoaderFn(true);
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        // console.log(result);
        this.propertyTypeList = result;
        this.commonService.togglePageLoaderFn(false);
      });
  }

  getCityList(stateId) {
    this.cityList = [];
    this.FetchingCityList = true;

    if (stateId) {
      this.commonService.getCitylistByState(stateId)
        .subscribe(response => {
          if (response.length > 0) {
            this.cityList = response;
            this.FetchingCityList = false;
          }
        });
    }
    else {
      this.cityList = [];
    }
  }

  submitForm(data) {
    console.log({ data });
    this.isSubmittingForm = true;
    data.value.userId = this.userService.currentUser.user._id;

    const imageData = new FormData();
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("propImages", ele, ele['name']);
    })
    for (let key in data.value) {
      // iterate and set other form data
      imageData.append(key, data.value[key])
    }
    console.log({ imageData });
    this.commonService.togglePageLoaderFn(true);
    this.http.post(this.commonService.base_url + '/property/new', imageData)
      .subscribe(result => {
        console.log({ result });
        let data = result && result['result'] || {};
        let message = result && result['message'] || '';
        if (data && data['slug']) {
          this.commonService.changeHeaderMessage({ type: 'success', message });
          this.router.navigate([`/property/view/${data.slug}`])
        }
        else this.commonService.changeHeaderMessage({ type: 'danger', message: 'Something Went Wrong' });
      }, err => {
        let errmessage = err.error && err.error.message || '';
        console.log({ err }, errmessage);
        this.commonService.changeHeaderMessage({ type: 'danger', message: errmessage });
        this.commonService.togglePageLoaderFn(false);
      },
        () => {
          this.commonService.togglePageLoaderFn(false);
        })
  }

  log(data) { console.log(data); }

  filesChange(fieldName: string, fileList) {
    console.log({ fileList });
    if (fileList && fileList.length) {
      // this.imgsToUpload = Object.values(fileList);
      let i = 0;
      Object.values(fileList).forEach(f => {
        if (fileList[i].size < 80000) {
          // console.log({ f });
          let reader = new FileReader();
          reader.readAsDataURL(fileList[i]);
          let name = fileList[i].name;
          // console.log(fileList[i]);
          this.imgsToUpload.push(f);
          reader.onload = (_event) => {
            this.imgUrls.push({ name, path: reader.result });
          }
        }
        i++;
      })
    }
    console.log('this.imgUrls', this.imgUrls, this.imgsToUpload);
  }

  removeSinglePic(img) {
    this.imgUrls = this.imgUrls.filter(e => img != e);
  }

  getDataTitleViaId(id, dataList, keyName) {
    if (!id || !dataList || !keyName) return '';

    let data = this[dataList].filter(e => e._id == id);
    return data.length && data[0][keyName] || '';
  }

  ngOnInit() {
    this.getPropertyTypeList();

    this.commonService.getStatelist()
      .subscribe(response => {
        if (response.length > 0) {
          this.stateList = response;
        }
      });

  }

}
