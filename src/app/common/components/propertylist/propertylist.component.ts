import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  @Input('listType') listType: string;
  @Input('blockView') blockView = false;

  propertyList;

  getPropertyList(params){
    this.commonService.togglePageLoaderFn(true);
    this.commonService.propertyList(params)
      .subscribe(result => {
        // console.log(result);
        this.propertyList = result;
        this.commonService.togglePageLoaderFn(false);
        
      })
  }

  ngOnInit() {
    this.getPropertyList(this.listType);
  }



}
