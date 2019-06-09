import { Directive, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) { }
  @Input('appInputFormat') format: any;

  @HostListener('focus') onFocus(){
  }

  @HostListener('blur') onBlur(){
    let value: string = this.el.nativeElement.value;
    if(this.format == 'singleWordFiltercapitalize'){
      value = value.replace(/[,"$!^@%* #() &]+/g, ""); // removing all the special characters white spaces between words(making single word)
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    else if(this.format == 'capitalize') value = value.charAt(0).toUpperCase() + value.slice(1);
    
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

}
