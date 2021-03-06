import { Request, Response, Router } from "express";
import { EventoController } from "../controllers/evento.controller";
import { AppRoute } from "../lib/router.lib";

export const eventoRoute = Router();
eventoRoute.post('/', AppRoute(EventoController, 'create'))
eventoRoute.get('/', AppRoute(EventoController, 'list'))
eventoRoute.get('/last', AppRoute(EventoController, 'last'))
eventoRoute.get('/email', AppRoute(EventoController, 'email'))
eventoRoute.post('/complete/:id', AppRoute(EventoController, 'complete'))
eventoRoute.get('/:id', AppRoute(EventoController, 'get'))
eventoRoute.post('/:id', AppRoute(EventoController, 'update'))
eventoRoute.delete('/:id', AppRoute(EventoController, 'delete'))

