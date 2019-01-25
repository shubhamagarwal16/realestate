import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) { }

  propertyDetail = {};

  getProperty(propertyId) {
    this.commonService.togglePageLoaderFn(true);
    this.commonService.getSingleProperty(propertyId)
      .subscribe(result => {
        console.log('propertydata: ', result);
        this.propertyDetail = result;
      },
      () => { },
      () => {
        this.commonService.togglePageLoaderFn(false);
      }
      );
  }

  ngOnInit() {
    let propertyId = this.activatedRoute.snapshot.paramMap.get('propertyId');
    if (propertyId) this.getProperty(propertyId);
  }

}
