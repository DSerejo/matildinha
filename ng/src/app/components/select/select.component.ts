import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor.class';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ],
})
export class SelectComponent extends ValueAccessorBase<string> implements OnInit{
  @Input() label: string;
  @Input() items: any[] = [];
  @Input() bindValue: string = 'id'
  @Input() bindLabel: string = 'name'

  ngOnInit(){
  }
}
