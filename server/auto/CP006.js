const request = require('supertest');
const app = require('../app');  


describe('CP006 - Recuperación de Contraseña con Correo No Registrado', () => {
    it('No debería enviar un correo de recuperación de contraseña a un correo no registrado', async () => {
      const res = await request(app)
        .post('/api/password-reset')
        .send({
          email: 'correonoregistrado@example.com'
        });
  
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('El correo electrónico no está registrado.');
    });
  });
  