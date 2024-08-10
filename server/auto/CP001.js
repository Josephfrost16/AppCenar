const request = require('supertest');
const app = require('../app');  

describe('CP001 - Registro de Usuario', () => {
  it('Debería registrar un usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'usuario@example.com',
        password: 'Contraseña123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Registro exitoso, por favor verifica tu correo electrónico.');
  });
});
