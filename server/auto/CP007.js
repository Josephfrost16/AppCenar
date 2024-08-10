const request = require('supertest');
const app = require('../app');  


describe('CP007 - Creación de Pedido', () => {
    it('Debería permitir al usuario crear un pedido correctamente', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          recipient: 'Destinatario',
          details: 'Detalles del pedido',
          deliveryDate: '2024-08-15',
          deliveryTime: '10:00'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Pedido creado con éxito.');
    });
  });
  