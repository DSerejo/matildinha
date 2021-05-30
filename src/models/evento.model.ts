import mongoose from 'mongoose';
import { Alerta } from './alerta.model';
class EventoDocument extends mongoose.Document{
    duracao: number;
    inicio: Date;
    fim: Date
    tipo: string
}
const eventoSchema = new mongoose.Schema<EventoDocument>({
    tipo: {
        type: String,
        enum: ['dormir', 'mamar', 'fralda', 'exercicio']
    },
    inicio: Date,
    duracao: Number,
    fim: Date,
    temFim: Boolean
  });
eventoSchema.index({inicio: -1})
eventoSchema.post('save', async function(){
    await Alerta.deleteMany({key: this.tipo})
})
export const Evento = mongoose.model<EventoDocument>('Evento', eventoSchema);