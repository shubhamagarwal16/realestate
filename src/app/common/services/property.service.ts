import { Injectable } from '@angular/core';

@Injectable()
export class PropertyService {

  constructor() { }

  markProperty(type){
    console.log("markProperty: ", type);    
  }

}
