import { BaseController } from "../lib/base-controller.class";
import { Evento } from "../models/evento.model";


export class EventoController extends BaseController{
    async create(){
        const evento = new Evento(this.di.request.body);
        await evento.save();
        return evento;
    }

    async list(){
        const dia = this.di.request.query?.dia as string;
        const filter = {};
        if(dia){
            const inicio = new Date(dia);
            inicio.setHours(0,0,0);
            const fim = new Date(inicio);
            fim.setDate(inicio.getDate() + 1);
            filter['inicio'] = {
                $gte: inicio,
                $lt: fim
            }
        }
        const eventos = await Evento.find(filter, {}, { sort: { 'inicio' : -1 } })
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

    async get({id}){
        return await Evento.findById(id)
    }

    async delete({id}){
        return await Evento.findByIdAndRemove(id);
    }

    async update({id}){
        const fields = this.di.request.body.fields;
        const updateObj = this.di.request.body.set;
        const e = await Evento.findById(id)
        fields.forEach((f: string) => {
            if(updateObj[f] !== undefined){
                (e as any)[f] = updateObj[f]
            }
        })
        if(e.fim){
            e.duracao = (new Date(e.fim)).getTime() - (new Date(e.inicio)).getTime()
        }
        await e.save();
        return e;
    }
}