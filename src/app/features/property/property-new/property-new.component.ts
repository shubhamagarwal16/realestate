import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../common/services/user.service';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private http: HttpClient
  ) { }

  propertyTypeList = [];
  stateList;
  private cityList = [];
  FetchingCityList = false;
  propertyFormData = {
    type: '',
    breadth: 0,
    length: 0
  }
  imgUrls = [];
  imgsToUpload;
  

  get plotArea(){ 
    if(this.propertyFormData.length && this.propertyFormData.breadth) 
      return this.propertyFormData.length * this.propertyFormData.breadth; 
    return null;
  }

  getPropertyTypeList(){
    this.commonService.togglePageLoaderFn(true);            
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        // console.log(result);
        this.propertyTypeList = result;
        this.commonService.togglePageLoaderFn(false);                
      });
  }

  getCityList(stateId){
    this.cityList = [];
    this.FetchingCityList = true;

    if(stateId != 0){
      this.commonService.getCitylistByState(stateId)
      .subscribe(response => {
        if(response.length > 0){
          this.cityList = response;
          this.FetchingCityList = false;
        }
      });
    }
    else{
      this.cityList = [];
    }
  }

  // @Output('changeHeaderMessage') changeHeaderMessage = new EventEmitter();
  //  {
  //   type: '',
  //   message: ''
  // }

  submitForm(data){
    console.log({data});
    data.value.userId = this.userService.currentUser.user._id;
    // console.log('userid: ', data.value.userId);
    const imageData = new FormData();
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("uploads[]", ele[index], ele[index]['name']);
    })
    console.log({imageData});
    // imageData.append('images', this.imgUrls, this.imgUrls.name);
    
    // this.http.post(this.commonService.base_url + '/property/new' , data.value)
    // .subscribe(result => {
    //   console.log(result);
    //   if(result && result['id']){
    //     this.commonService.changeHeaderMessage({ type: 'success', message: 'You property has been listed successfully'  });
    //   }
    // })
  }

  log(data) {    console.log(data);  }

  filesChange(fieldName: string, fileList) {
    if(fileList && fileList.length){
      this.imgsToUpload = Object.values(fileList);
      let i = 0;
      Object.values(fileList).forEach(f => {
        let reader = new FileReader();
        reader.readAsDataURL(fileList[i]); 
        let name = fileList[i].name;
        reader.onload = (_event) => { 
          this.imgUrls.push({ name, path: reader.result}); 
        }    
        i++;
      })
    }
    console.log('this.imgUrls', this.imgUrls, this.imgsToUpload);
  }

  removeSinglePic(img){
    this.imgUrls = this.imgUrls.filter(e => img != e );
  }

  getDataTitleViaId(id, dataList, keyName){
    if(!id || !dataList || !keyName) return '';

    let data = this[dataList].filter(e => e._id == id );
    return data.length && data[0][keyName] || '';
  }

  ngOnInit() {
    this.getPropertyTypeList();

    this.commonService.getStatelist()
    .subscribe(response => {
      if(response.length > 0){
        this.stateList = response;
      }
      });

  }

}
