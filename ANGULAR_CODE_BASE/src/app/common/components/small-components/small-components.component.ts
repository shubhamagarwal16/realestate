import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-components',
  templateUrl: './small-components.component.html',
  styleUrls: ['./small-components.component.scss']
})
export class SmallComponentsComponent implements OnInit {

  @Input('loaderActive') loaderActive = false;
  @Input('componentName') componentName: any = '';
  @Input('toolTipData') toolTipData: any = {};

  constructor() { }

  ngOnInit() {
  }

}
