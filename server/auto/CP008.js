const request = require('supertest');
const app = require('../app');  


describe('CP008 - Creación de Pedido con Campos Vacíos', () => {
    it('No debería permitir la creación de un pedido con campos obligatorios vacíos', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          recipient: '',
          details: 'Detalles del pedido',
          deliveryDate: '2024-08-15',
          deliveryTime: '10:00'
        });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Todos los campos obligatorios deben ser completados.');
    });
  });
  