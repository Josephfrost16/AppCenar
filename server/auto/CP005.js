const request = require('supertest');
const app = require('../app');  


describe('CP005 - Recuperación de Contraseña', () => {
    it('Debería permitir al usuario solicitar la recuperación de su contraseña', async () => {
      const res = await request(app)
        .post('/api/password-reset')
        .send({
          email: 'usuario@example.com'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Se ha enviado un correo con las instrucciones para recuperar la contraseña.');
    });
  });
  