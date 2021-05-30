import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Evento, EventoService } from '../event.service';
import * as moment from 'moment'
import humanize from 'humanize-duration'
import { faBaby, faBed, faDumbbell, faWineBottle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  loading = true;
  
  eventos: (Evento & {duracao?: string, icon: IconDefinition})[]
  dia = new Date
  constructor(private service: EventoService) { }

  ngOnInit(): void {
    this.reload()
  }

  reload(){
    this.loading = true;
    this.service.list({dia: moment(this.dia).format('YYYY-MM-DD')})
      .pipe(tap(() => this.loading = false))
      .subscribe(res => this.eventos = res.map((e: any) => {
        e.inicio = moment(e.inicio).calendar();
        e.duracao = e.duracao?humanize(e.duracao, { units: ["h", "m"],maxDecimalPoints:0 }):''
        if(e.tipo == 'dormir'){
          e.icon = faBed
        }
        if(e.tipo == 'mamar'){
          e.icon = faWineBottle
        }
        if(e.tipo == 'fralda'){
          e.icon = faBaby
        }
        if(e.tipo == 'exercicio'){
          e.icon = faDumbbell
        }
        return e
      }))
  }

}
