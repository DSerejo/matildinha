import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor.class';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true}
  ],
})
export class InputComponent extends ValueAccessorBase<string>{
  @Input() label: string = '';
}
