import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(private el: ElementRef) { }
  @Input('appInputFormat') format: any;

  @HostListener('focus') onFocus(){
  }

  @HostListener('blur') onBlur(){
    let value: string = this.el.nativeElement.value;
    if(this.format == 'singleWordFiltercapitalize'){
      value = value.replace(/[,"$!^@%* #() &]+/g, "");
      this.el.nativeElement.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    if(this.format == 'capitalize'){
      this.el.nativeElement.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

}
