import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Evento, EventoService } from '../event.service';
import humanize from 'humanize-duration'
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: EventoService) { }

  last: Evento;
  duracao$: BehaviorSubject<string> = new BehaviorSubject('');
  ultimoCompleto: boolean;
  loading = true;
  get inicio(){
    return moment(this.last.inicio).calendar()
  }
  ngOnInit(): void {
    this.service.last().subscribe(this.onLast.bind(this))
  }
  onLast(e: Evento){
    this.last = e
    this.ultimoCompleto = !!e.fim || e.tipo == 'fralda'
    this.loading = false;
    if(!this.ultimoCompleto){
      timer(0, 1000).subscribe(() => {
        this.duracao$.next(humanize((new Date).getTime() - (new Date(e.inicio)).getTime()))
      })
    }
  }
  concluir(){
    this.loading = true;
    this.service.complete(this.last._id).subscribe(e => this.onLast(e))
  }

}
