import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService } from '../../services/common.service';
import { PropertyService } from '../../services/property.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit, OnChanges {

  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private propertyService: PropertyService
  ) { }

  // @Input('listType') listType: string;
  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';

  propertyList = [];

  getPropertyList(params = ''){
    this.commonService.togglePageLoaderFn(true);

    this.commonService.filterProperties(params)
      .subscribe((result: any) => {
        // console.log('propertyList ', result);
        if(result)
          this.propertyList = result;
        this.commonService.togglePageLoaderFn(false);        
        // console.log('propertyList: ', this.propertyList);
      });
      
  }

  ngOnInit() {
    this.getPropertyList(this.queryParams);
  }

  ngOnChanges() {
    // console.log('ngOnChanges');
    
    this.getPropertyList(this.queryParams);
  }

}
