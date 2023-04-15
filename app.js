import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

// Importar rutas
import categoriesRoutes from './routes/categories.routes';

// Inicialización
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));

// Variables globales

// Rutas
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    autor: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/categories', categoriesRoutes);

// Public

export default app;
