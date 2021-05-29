import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EventoService {
    constructor(private http: HttpClient){}

    create(payload: CreateEventPayload){
        return this.http.post('/api/evento', payload);
    }

    last(){
        return this.http.get<Evento>('/api/evento/last');
    }

    complete(id: string){
        return this.http.post<Evento>('/api/evento/complete/' + id, {})
    }
}

export type CreateEventPayload = {
    inicio: Date
    tipo: TipoEvento
}

export type TipoEvento = 'dormir' | 'mamar' | 'fralda'

export interface Evento {
    _id: string;
    inicio: string;
    fim?: string;
    tipo: TipoEvento,
    duracao?: number
}