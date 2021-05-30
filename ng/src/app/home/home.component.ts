import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Evento, EventoService } from '../event.service';
import humanize from 'humanize-duration'
import * as moment from 'moment';
import { Alerta, AlertaService } from '../alerta.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  last: Evento;
  duracao$: BehaviorSubject<string> = new BehaviorSubject('');
  ultimoCompleto: boolean;
  loading = true;
  alertas: Alerta[] 

  get inicio(){
    return moment(this.last.inicio).calendar()
  }
  
  constructor(private service: EventoService, private alertaService: AlertaService) { }

 
  ngOnInit(): void {
    this.service.last().subscribe(this.onLast.bind(this))
    this.alertaService.list().subscribe(alertas => {
      this.alertas = alertas.map(a => {
        a.key = a.key.charAt(0).toUpperCase() + a.key.slice(1)
        a.created_at = moment(a.created_at).calendar()
        return a;
      })
    })
  }
  onLast(e: Evento){
    this.last = e
    
    this.ultimoCompleto = !e || !!e.fim || e.tipo == 'fralda'
    this.loading = false;
    if(!this.ultimoCompleto){
      timer(0, 1000).subscribe(() => {
        this.duracao$.next(humanize((new Date).getTime() - (new Date(e.inicio)).getTime(), {maxDecimalPoints: 0}))
      })
    }
  }
  concluir(){
    this.loading = true;
    this.service.complete(this.last._id).subscribe(e => this.onLast(e))
  }


  updateAlerta({_id, active}: Alerta){
    setTimeout(() => {
      this.alertaService.update(_id, {
        set: {
          active: !active
        },
        fields: ['active']
      }).subscribe()
    })
    
  }
}
