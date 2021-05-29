import { BaseController } from "../lib/base-controller.class";
import { Evento } from "../models/evento.model";


export class EventoController extends BaseController{
    async create(){
        const evento = new Evento(this.di.request.body);
        await evento.save();
        return evento;
    }

    async list(){
        const eventos = await Evento.find({}, {}, { sort: { 'inicio' : -1 } })
        return eventos
    }

    async last() {
        return await Evento.findOne({}, {}, { sort: { 'inicio' : -1 } })
    }

    async complete({id}){
        const e = await Evento.findById(id)
        e.fim = this.di.request.body.fim || new Date
        e.duracao = e.fim.getTime() - e.inicio.getTime()
        await e.save();
        return e;
    }
}