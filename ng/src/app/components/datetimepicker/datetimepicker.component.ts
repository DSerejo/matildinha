import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor.class';
import * as moment from 'moment';

const rangeItems = (length: number, offset = 1, pad: number = 2 ) => [...Array(length).keys()].map(i => {
  const id = i+offset;
  let name: string;
  if(pad){
    name = String(id).padStart(pad, '0');
  }
  return {
    id, 
    name
  }
});
@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: DatetimepickerComponent, multi: true}
  ],
})
export class DatetimepickerComponent extends ValueAccessorBase<Date> implements OnInit{
  
  days = rangeItems(31)
  months = moment.months().map((name, i) => ({id: i+1, name}));
  years = rangeItems(3, 2021)
  hours = rangeItems(24, 0)
  minutes = rangeItems(60, 0)
  @Input() label: string = '';

  ngOnInit(){
    if(!this.value){
      this.value = new Date;
    }
  }

  get hour() {
    return this.value?.getHours();
  }
  set hour(val: number) {
    if(!this.value || isNaN(this.value.getTime())){
      this.value = new Date;
    }
    this.value?.setHours(val)
  }

  get minute() {
    return this.value?.getMinutes();
  }
  set minute(val: number) {
    if(!this.value || isNaN(this.value.getTime())){
      this.value = new Date;
    }
    this.value?.setMinutes(val)
  }

  get day() {
    return this.value?.getDate();
  }
  set day(val: number) {
    if(!this.value || isNaN(this.value.getTime())){
      this.value = new Date;
    }
    this.value?.setDate(val)
  }

  get month() {
    return this.value?.getMonth();
  }
  set month(val: number) {
    if(!this.value || isNaN(this.value.getTime())){
      this.value = new Date;
    }
    this.value?.setMonth(val)
  }

  get year() {
    return this.value?.getFullYear();
  }
  set year(val: number) {
    if(!this.value || isNaN(this.value.getTime())){
      this.value = new Date;
    }
    this.value?.setFullYear(val)
  }
}
