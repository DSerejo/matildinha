import express from 'express';
import path from "path";
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import compression from 'compression'
import { eventoRoute } from './routes/eventos.route';
import { di } from './lib/di.lib';
import { alertaRoute } from './routes/alertas.route';
// rest of the code remains same
const publicPath = process.env.NODE_ENV == 'production'? path.join(__dirname, 'ng'): path.join(__dirname, '../ng/dist/ng');
const app = express();
const PORT =  process.env.PORT || 8000;
const DB_NAME = process.env.DB_NAME || 'dev'
mongoose.connect(`mongodb+srv://admin:2mASMJfcpaUnWhJf@cluster0.uawp9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true})
app.engine('html', require('ejs').renderFile);
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.json())
if(process.env.NODE_ENV == 'production'){
  app.use(compression())
}

app.use(express.static(publicPath))
  .set('views', publicPath)
app.use((req, res , next) => {
  di.request = req;
  di.response = res;
  next();
})




// app.use('/api/evento', async (req, res) => {
//   const evento = new Evento(req.body);
//   await evento.save();
//   res.send(evento);
// });
app.use('/api/evento', eventoRoute);
app.use('/api/alerta', alertaRoute);
app.get('*', (req, res) => res.render('index.html'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

