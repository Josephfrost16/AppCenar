const request = require('supertest');
const app = require('../app');  

describe('CP010 - Creación de Cuenta para Mensajero', () => {
    it('Debería permitir al administrador crear una cuenta para un mensajero', async () => {
      const res = await request(app)
        .post('/api/messengers')
        .send({
          name: 'Nombre Mensajero',
          email: 'mensajero@example.com',
          password: 'Contraseña123'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Cuenta creada con éxito.');
    });
  });
  