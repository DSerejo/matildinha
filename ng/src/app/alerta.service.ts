import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AlertaService {
    constructor(private http: HttpClient){}

    list(){
        return this.http.get<Alerta[]>('/api/alerta');
    }

    update(id: string, payload: UpdateAlertaPayload){
        return this.http.post<Alerta>('/api/alerta/' + id, payload);
    }
    
}

export const TiposEventos = [{
    id: 'dormir',
    name: 'Dormir'
  },{
    id: 'exercicio',
    name: 'Exercicio'
  },{
    id: 'fralda',
    name: 'Fralda'
  },
  {
    id: 'mamar',
    name: 'Mamar'
  }]


export interface Alerta {
    _id?: string;
    active?: boolean;
    created_at?: string;
    last_notification?: string
    key?: string
}

export type UpdateAlertaPayload = {
    set: {
        active: boolean,
    },
    fields: string[]
}