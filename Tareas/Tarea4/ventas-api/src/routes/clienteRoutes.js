import { Router } from 'express';
import * as ctrl from '../controller/clienteController.js';
const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Clientes
 */

/**
 * @openapi
 * /api/clientes:
 *   get:
 *     tags: [Clientes]
 *     summary: Listar clientes (paginación)
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
 *     tags: [Clientes]
 *     summary: Crear cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteCreate'
 *     responses:
 *       201: { description: Creado }
 */
router.get('/api/clientes', ctrl.list);
router.post('/api/clientes', ctrl.create);

/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     tags: [Clientes]
 *     summary: Obtener cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   put:
 *     tags: [Clientes]
 *     summary: Actualizar cliente
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
 *             $ref: '#/components/schemas/ClienteUpdate'
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *   delete:
 *     tags: [Clientes]
 *     summary: Eliminar cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.get('/api/clientes/:id', ctrl.getById);
router.put('/api/clientes/:id', ctrl.update);
router.delete('/api/clientes/:id', ctrl.remove);

/**
 * @openapi
 * /api/clientes/{clienteId}/facturas:
 *   get:
 *     tags: [Clientes]
 *     summary: Obtener todas las facturas de un cliente
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Cliente no encontrado }
 */
router.get('/api/clientes/:clienteId/facturas', ctrl.facturasByCliente);

export default router;
