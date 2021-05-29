import {Request, Response} from 'express';
export class Di {
    request: Request;
    response: Response;

    set(prop: string, val:any){
        (this as any)[prop] = val;
    }
}

export const di = new Di;