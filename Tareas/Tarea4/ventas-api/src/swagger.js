import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'API Ventas', version: '1.0.0', description: 'Sistema de ventas (Productos, Clientes, Facturas y Detalles)' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Detalle no encontrado' }
          }
        },
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            marca: { type: 'string' },
            stock: { type: 'integer' }
          }
        },
        ProductoCreate: {
          type: 'object',
          required: ['nombre','descripcion','marca','stock'],
          properties: {
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            marca: { type: 'string' },
            stock: { type: 'integer', minimum: 0 }
          }
        },
        ProductoUpdate: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            marca: { type: 'string' },
            stock: { type: 'integer', minimum: 0 }
          }
        },

        Cliente: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ci: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            sexo: { type: 'string', enum: ['M','F'] }
          }
        },
        ClienteCreate: {
          type: 'object',
          required: ['ci','nombres','apellidos','sexo'],
          properties: {
            ci: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            sexo: { type: 'string', enum: ['M','F'] }
          }
        },
        ClienteUpdate: { $ref: '#/components/schemas/ClienteCreate' },

        Factura: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fecha: { type: 'string', format: 'date' },
            clienteId: { type: 'integer', example: 1 }
          }
        },
        FacturaCreate: {
          type: 'object',
          required: ['fecha','clienteId'],
          properties: {
            fecha: { type: 'string', format: 'date' },
            clienteId: { type: 'integer' }
          }
        },
        FacturaUpdate: { $ref: '#/components/schemas/FacturaCreate' },

        DetalleFactura: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            facturaId: { type: 'integer', example: 10 },
            productoId: { type: 'integer', example: 1 },
            cantidad: { type: 'integer', example: 2 },
            precio: { type: 'number', example: 12.5 }
          }
        },
        DetalleFacturaCreate: {
          type: 'object',
          required: ['productoId','cantidad','precio'],
          properties: {
            productoId: { type: 'integer' },
            cantidad: { type: 'integer', minimum: 1 },
            precio: { type: 'number', minimum: 0 }
          }
        },
        DetalleFacturaUpdate: { $ref: '#/components/schemas/DetalleFacturaCreate' }
      }
    }
  },
  apis: ['./src/routes/*.js'],
});
