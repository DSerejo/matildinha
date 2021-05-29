import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { TipoEvento, EventoService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  tipo: TipoEvento = 'dormir'
  tipos = [{
    id: 'dormir',
    name: 'Dormir'
  },
  {
    id: 'mamar',
    name: 'Mamar'
  },{
    id: 'fralda',
    name: 'Fralda'
  }]

  time: NgbTimeStruct;
  constructor(private service: EventoService, private router: Router) { 
    const now = new Date()
    this.time = {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const inicio = new Date();
    inicio.setHours(this.time.hour, this.time.minute, this.time.second);
    this.service.create({
      tipo: this.tipo,
      inicio
    }).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
