const request = require('supertest');
const app = require('../app');  


describe('CP003 - Inicio de Sesión', () => {
    it('Debería permitir al usuario iniciar sesión con credenciales válidas', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'usuario@example.com',
          password: 'Contraseña123'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Inicio de sesión exitoso.');
    });
  });
  