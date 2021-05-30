import { Alerta,AlertaDocument } from "../models/alerta.model";
import { Evento } from "../models/evento.model";

export class Alertas {
    async run() {
        
        const alertas = await Promise.all([
            this.alertaFralda(),
            this.alertaMama()
            // this.alertaExercicio()
        ])
        
        return alertas.filter(a => !!a);
    }

    async alertaFralda() {
        const HOURS = 4 * 60 * 60;
        const EVERY = 1 * 60 * 60 * 1000
        const KEY = 'fralda';
        return this.alertaACadaTempo(HOURS, EVERY, KEY, 'MATILDINHA - FRALDA!!!');
    }

    async alertaMama(){
        const HOURS = 3 * 60 * 60;
        const EVERY = 1 * 60 * 60 * 1000
        const KEY = 'mamar';
        return this.alertaACadaTempo(HOURS, EVERY, KEY, 'MATILDINHA - MAMAR!!!');
    }

    async alertaACadaTempo(HOURS: number, EVERY: number, KEY: string, msg: string){
        const now = new Date();
        now.setSeconds(now.getSeconds() - HOURS);
        const e = await  Evento.findOne({inicio: {$gte: now}, tipo: KEY})
        const ativo = await this.getAlertaAtivo(KEY);
        if(!e && (!ativo || ativo.active)){
            if(ativo){
                if(ativo.timeSinceLastNotification() < EVERY){
                    return null;
                }else{
                    ativo.last_notification = new Date();
                    await ativo.save();
                }
            }else{
                await this.criaAlerta(KEY);
            }
            return this.msg(msg)
        }
        return null
    }

    async alertaExercicio(){
        const HOUR = 20;
        const deadline = new Date();
        deadline.setHours(HOUR, 0,0);
        if(new Date() < deadline){
            return null;
        }
        const hoje = new Date();
        hoje.setHours(0,0,0);
        
        const e = await  Evento.findOne({inicio: {$gte: hoje}, tipo: 'exercicio'})
        if(!e){
            return this.msg('MATILDINHA - EXERCICIO!!!')
        }
        return null
    }

    async getAlertaAtivo(key: string): Promise<AlertaDocument>{
        return await Alerta.findOne({key})
    }

    async criaAlerta(key: string) : Promise<AlertaDocument>{
        const a = new Alerta({created_at: new Date(), last_notification: new Date(), key, active: true})
        a.save();
        return a;
    }

    msg(subject: string) {
        return {
            to: ['dennyserejom@gmail.com', 'ca.marquess@gmail.com'],
            from: {name: 'Matildinha', email: 'dennyserejom@gmail.com'},
            templateId: 'd-5e9de4fb947d42be98b06b84af76502d',
            dynamic_template_data: {
                subject
            }
        }
    }


}