const request = require('supertest');
const app = require('../app');  


describe('CP004 - Inicio de Sesión con Credenciales Incorrectas', () => {
    it('No debería permitir el inicio de sesión con credenciales incorrectas', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'usuario@example.com',
          password: 'ContraseñaIncorrecta'
        });
  
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Credenciales incorrectas.');
    });
  });
  