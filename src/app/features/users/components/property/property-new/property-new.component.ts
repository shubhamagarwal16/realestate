import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../common/services/common.service';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrls: ['./property-new.component.scss']
})
export class PropertyNewComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  propertyTypeList = [];

  getPropertyTypeList(){
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        console.log(result);
        
      });
  }

  ngOnInit() {
    this.getPropertyTypeList();
  }

}
