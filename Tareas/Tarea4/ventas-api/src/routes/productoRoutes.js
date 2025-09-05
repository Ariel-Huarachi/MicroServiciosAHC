import { Router } from 'express';
import * as ctrl from '../controller/productoController.js';
const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Productos
 */

/**
 * @openapi
 * /api/productos:
 *   get:
 *     tags: [Productos]
 *     summary: Listar productos (con paginación)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100 }
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [Productos]
 *     summary: Crear producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoCreate'
 *     responses:
 *       201: { description: Creado }
 */
router.get('/api/productos', ctrl.list);
router.post('/api/productos', ctrl.create);

/**
 * @openapi
 * /api/productos/{id}:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   put:
 *     tags: [Productos]
 *     summary: Actualizar producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoUpdate'
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   delete:
 *     tags: [Productos]
 *     summary: Eliminar producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.get('/api/productos/:id', ctrl.getById);
router.put('/api/productos/:id', ctrl.update);
router.delete('/api/productos/:id', ctrl.remove);

export default router;
