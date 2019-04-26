import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-main',
  templateUrl: './property-main.component.html',
  styleUrls: ['./property-main.component.scss']
})
export class PropertyMainComponent implements OnInit {

  constructor() { }

  buttons = [
    {
      name: 'All Properties',
      route: 'all'
    },
    {
      name: 'Active Properties',
      route: 'active'
    },
    {
      name: 'Sold/Acquired',
      route: 'sold'
    },
    {
      name: 'Inactive Properties',
      route: 'inactive'
    }
  ]

  ngOnInit() { 
  }

}
