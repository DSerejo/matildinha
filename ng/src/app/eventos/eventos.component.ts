import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Evento, EventoService } from '../event.service';
import * as moment from 'moment'
import humanize from 'humanize-duration'
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  loading = true;
  eventos: (Evento & {duracao?: string})[]
  constructor(private service: EventoService) { }

  ngOnInit(): void {
    this.service.list()
      .pipe(tap(() => this.loading = false))
      .subscribe(res => this.eventos = res.map(e => {
        e.inicio = moment(e.inicio).calendar();
        e.duracao = e.duracao?humanize(e.duracao, { units: ["m"],maxDecimalPoints:0 }):''
        return e
      }))
  }

}
