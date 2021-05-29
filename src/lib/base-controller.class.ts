import { Injectable } from "./injectable.class";

export class BaseController extends Injectable {
    async handle(func: string,req, res){
        if((this as any)[func]){
            const resp = await (this as any)[func](req.params);
            res.send(resp)
        }
    }
}