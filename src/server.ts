import express from 'express';
import path from "path";
// rest of the code remains same
const publicPath = process.env.NODE_ENV == 'production'? path.join(__dirname, 'ng'): path.join(__dirname, '../ng/dist/ng');
const app = express();
const PORT =  process.env.PORT || 8000;
app.use(express.static(publicPath))
  .set('views', publicPath)
app.get('/', (req, res) => res.render('index'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});