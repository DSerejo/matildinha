import { Request, Response, Router } from "express";
import { AlertaController } from "../controllers/alerta.controller";
import { AppRoute } from "../lib/router.lib";

export const alertaRoute = Router();
alertaRoute.get('/', AppRoute(AlertaController, 'list'))
alertaRoute.post('/:id', AppRoute(AlertaController, 'update'))