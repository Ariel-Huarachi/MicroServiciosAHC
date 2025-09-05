import { Router } from 'express';
import * as ctrl from '../controller/facturaController.js';
const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Facturas
 */

/**
 * @openapi
 * /api/facturas:
 *   get:
 *     tags: [Facturas]
 *     summary: Listar facturas (paginación)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Facturas]
 *     summary: Crear factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaCreate'
 *     responses:
 *       201: { description: Creado }
 */
router.get('/api/facturas', ctrl.list);
router.post('/api/facturas', ctrl.create);

/**
 * @openapi
 * /api/facturas/{id}:
 *   get:
 *     tags: [Facturas]
 *     summary: Obtener factura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   put:
 *     tags: [Facturas]
 *     summary: Actualizar factura
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
 *             $ref: '#/components/schemas/FacturaUpdate'
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   delete:
 *     tags: [Facturas]
 *     summary: Eliminar factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.get('/api/facturas/:id', ctrl.getById);
router.put('/api/facturas/:id', ctrl.update);
router.delete('/api/facturas/:id', ctrl.remove);

export default router;
