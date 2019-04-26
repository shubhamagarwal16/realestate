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
  imageDetail;

  getProperty(propertySlug) {
    this.commonService.togglePageLoaderFn(true);
    this.commonService.getSingleProperty(propertySlug)
      .subscribe(result => {
        console.log({result});
        this.propertyDetail = result['result'];
        this.imageDetail = result['files'];
      },
      (err) => { 
        console.log({err});
        this.commonService.togglePageLoaderFn(false);
      },
      () => {
        this.commonService.togglePageLoaderFn(false);
      }
      );
  }

  ngOnInit() {
    let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
    if (propertySlug) this.getProperty(propertySlug);
  }

}
