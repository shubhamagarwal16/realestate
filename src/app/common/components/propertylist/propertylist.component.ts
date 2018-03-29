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

  @Input('listType') listType;

  getPropertyList(){
    this.commonService.propertyList(this.listType)
      .subscribe(result => {
        console.log(result);
        
      })
  }

  ngOnInit() {
    this.getPropertyList();
  }



}
