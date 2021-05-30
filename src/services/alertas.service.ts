import { Evento } from "../models/evento.model";

export class Alertas {
    async run() {
        
        const alertas = await Promise.all([
            this.alertaFralda(),
            this.alertaMama(),
            this.alertaExercicio()
        ])
        
        return alertas.filter(a => !!a);
    }

    async alertaFralda() {
        const HOURS = 4;
        const now = new Date();
        now.setHours(now.getHours() - HOURS);
        const e = await  Evento.findOne({inicio: {$gte: now}, tipo: 'fralda'})
        if(!e){
            return this.msg('MATILDINHA - FRALDA!!!')
        }
        return null
    }

    async alertaMama(){
        const HOURS = 3;
        const now = new Date();
        now.setHours(now.getHours() - HOURS);
        const e = await  Evento.findOne({inicio: {$gte: now}, tipo: 'mamar'})
        if(!e){
            return this.msg('MATILDINHA - MAMAR!!!')
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