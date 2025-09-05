import { Router } from 'express';
import * as ctrl from '../controller/detalleController.js';
const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Detalles
 */

/**
 * @openapi
 * /api/facturas/{facturaId}/detalles:
 *   get:
 *     tags: [Detalles]
 *     summary: Listar detalles de una factura
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Detalles]
 *     summary: Agregar detalle a una factura
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFacturaCreate'
 *     responses:
 *       201: { description: Creado }
 */
router.get('/api/facturas/:facturaId/detalles', ctrl.listByFactura);
router.post('/api/facturas/:facturaId/detalles', ctrl.addToFactura);

/**
 * @openapi
 * /api/detalles/{id}:
 *   put:
 *     tags: [Detalles]
 *     summary: Actualizar un detalle
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
 *             $ref: '#/components/schemas/DetalleFacturaUpdate'
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   delete:
 *     tags: [Detalles]
 *     summary: Eliminar un detalle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.put('/api/detalles/:id', ctrl.update);
router.delete('/api/detalles/:id', ctrl.remove);

export default router;
