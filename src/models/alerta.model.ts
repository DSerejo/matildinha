import mongoose from 'mongoose';
export class AlertaDocument extends mongoose.Document{
    active: boolean;
    created_at: Date;
    last_notification: Date
    key: string
    timeSinceLastNotification: () => number;
}
const alertaSchema = new mongoose.Schema<AlertaDocument>({
    key: String,
    created_at: Date,
    active: Boolean,
    last_notification: Date
  });
alertaSchema.index({key: 1})
alertaSchema.methods.timeSinceLastNotification = function(){
    return (new Date()).getTime() - this.last_notification.getTime()
}
export const Alerta = mongoose.model<AlertaDocument>('Alerta', alertaSchema);