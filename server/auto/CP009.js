const request = require('supertest');
const app = require('../app');  

describe('CP009 - Visualización del Estado del Pedido', () => {
    it('Debería permitir al usuario visualizar el estado de su pedido', async () => {
      const res = await request(app)
        .get('/api/orders/1')  // Suponiendo que el ID del pedido es 1
        .set('Authorization', `Bearer token_valido`);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('En tránsito');
    });
  });
  