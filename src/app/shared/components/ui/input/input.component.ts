import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> InputComponent),
      multi:true
    } 
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() type:string = 'text';
  @Input() id:string = '';
  
  value:string ='';

  
  onChange:(value:string) =>void = () => {};

  onTouched: () => void = () => {};

  
  writeValue(value: string | null): void {
      this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
      this.onChange = fn
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn
  }

  updateValue(val: string) {
    this.value = val;
    this.onChange(val);
  }

}