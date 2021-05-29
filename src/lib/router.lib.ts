import { BaseController } from "./base-controller.class";

export const AppRoute = (controller: typeof BaseController, func: string) => {
    const c = new controller;
    return c.handle.bind(c, func)
}