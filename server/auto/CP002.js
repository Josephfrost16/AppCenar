const request = require('supertest');
const app = require('../app');  


describe('CP002 - Registro de Usuario con Correo Existente', () => {
    it('No debería permitir registrar un usuario con un correo electrónico ya registrado', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          email: 'usuario@example.com',
          password: 'Contraseña123'
        });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('El correo electrónico ya está registrado.');
    });
  });
  