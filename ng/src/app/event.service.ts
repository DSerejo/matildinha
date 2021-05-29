import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EventoService {
    constructor(private http: HttpClient){}

    create(payload: CreateEventPayload){
        return this.http.post('/api/evento', payload);
    }
    update(id: string, payload: UpdateEventPayload){
        return this.http.post<Evento>('/api/evento/' + id, payload);
    }

    last(){
        return this.http.get<Evento>('/api/evento/last');
    }

    complete(id: string){
        return this.http.post<Evento>('/api/evento/complete/' + id, {})
    }

    list(){
        return this.http.get<Evento[]>('/api/evento/')
    }

    get(id:string){
        return this.http.get<Evento>('/api/evento/' + id)
    }

    delete(id: string){
        return this.http.delete('/api/evento/' + id)
    }
}

export const TiposEventos = [{
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

export type CreateEventPayload = {
    inicio: Date
    tipo: TipoEvento
}

export type UpdateEventPayload = {
    set: {
        inicio: Date,
        fim?: Date
    },
    fields: string[]
}

export type TipoEvento = 'dormir' | 'mamar' | 'fralda'

export interface Evento {
    _id: string;
    inicio: string;
    fim?: string;
    tipo: TipoEvento,
    duracao?: string
}