import { BaseController } from "../lib/base-controller.class";
import { Alerta } from "../models/alerta.model";

export class AlertaController extends BaseController{
    
    async list(){
        return await Alerta.find()
    }

    async update({id}){
        const fields = this.di.request.body.fields;
        const updateObj = this.di.request.body.set;
        const e = await Alerta.findById(id)
        fields.forEach((f: string) => {
            if(updateObj[f] !== undefined){
                (e as any)[f] = updateObj[f]
            }
        })
        await e.save();
        return e;
    }
}