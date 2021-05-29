import mongoose from 'mongoose';
class EventoDocument extends mongoose.Document{
    duracao: number;
    inicio: Date;
    fim: Date
}
const eventoSchema = new mongoose.Schema<EventoDocument>({
    tipo: {
        type: String,
        enum: ['dormir', 'mamar', 'fralda']
    },
    inicio: Date,
    duracao: Number,
    fim: Date,
    temFim: Boolean
  });
eventoSchema.index({inicio: -1})
export const Evento = mongoose.model<EventoDocument>('Evento', eventoSchema);