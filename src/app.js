import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

// Importar rutas
import categoriesRoutes from './routes/categories.routes';

const app = express();

app.set('pkg', pkg);

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    autor: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/categories', categoriesRoutes);

export default app;
