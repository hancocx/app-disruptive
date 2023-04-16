import { Router, Routes } from 'express';
const router = Router();

// Importar los controladores masivamente
import * as categoryCtrl from '../controllers/categories.controller';

// Tipeo de rutas
//router.get('/', (req, res) => res.json('All Categories'));

// Crear una categoria.
router.post('/', categoryCtrl.createCategory);

// Obtener todas las categorias.
router.get('/', categoryCtrl.getCategories);

// Obtener una categoria por su ID.
router.get('/:categoryId', categoryCtrl.getCategoryById);

// Actualizar categoria.
router.put('/:categoryId', categoryCtrl.updateCategoryById);

// Eliminar categoria por ID.
router.delete('/:categoryId', categoryCtrl.deleteCategoryById);

export default router;
