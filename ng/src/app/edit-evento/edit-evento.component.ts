import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Evento, EventoService, TiposEventos } from '../event.service';

type EventoEditable = Omit<Evento, 'inicio' | 'fim'> & {inicio: Date, fim: Date}
@Component({
  selector: 'app-edit-evento',
  templateUrl: './edit-evento.component.html',
  styleUrls: ['./edit-evento.component.scss']
})
export class EditEventoComponent implements OnInit {

  evento: EventoEditable
  loading = true;
  tipos = TiposEventos;
  confirmDelete = false;
  id: string
  constructor(private route: ActivatedRoute, private service: EventoService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((p: Params) => of(p.id as string)),
        filter(id => !!id),
        tap(id => {
          this.id = id
        }),
        switchMap(id => this.service.get(id)),
        switchMap(evento => {
          const e: EventoEditable = evento as any;
          e.inicio = new Date(evento.inicio);
          e.fim = new Date(evento.fim|| evento.inicio);
          return of(e);
        }),
        tap(() => {
          this.loading = false;
        })
      ).subscribe(e => this.evento = e)
  }

  delete(){
    if(!this.confirmDelete){
      this.confirmDelete = true;
    }else{
      this.loading = true;
      this.service.delete(this.id).subscribe(()=> {
        this.loading = false;
        this.confirmDelete = false;
        this.router.navigate(['/eventos']);
      })
    }
  }
  save(){
    this.loading = true;
    const {inicio, fim} = this.evento
    const fields = ['inicio']
    if(fim)
      fields.push('fim')
    this.service.update(this.id, {
      set: {
        inicio,
        fim
      },
      fields
    }).subscribe(() => {
      this.router.navigate(['/eventos']);
    })    
  }

}
