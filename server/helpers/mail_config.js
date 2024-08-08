
const nodemailer = require('nodemailer');
const Mail = {
    user: "josephninahonestoypuntual@gmail.com",
    pass: "sjku joto ikpu rjvp",
  };

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Mail.user,
      pass: Mail.pass,
    },
  });


  exports.sendMail = async (email,subject,html)=>{

    await transporter.sendMail({
        from: `AppCenar <${Mail.user}>`,
        to: email,
        subject,
        html
      });
  }


  exports.getTemplate = async (name,token) =>{
    return `
    <div id="email_content">
          <h2>Hola ${name}!</h2>
          <p>Haga click en el siguiente enlace para activar su cuenta.</p>

          <a href= "http://localhost:8000/pages/Auth/confirm.html">Activar cuenta</a>
    </div>
    
    `

  }

  exports.getTemplate2 = async (name,token) =>{
    return `
    <div id="email_content">
          <h2>Hola ${name}!</h2>
          <h3>Usted solicitó un cambio de contraseña</h3>
          <p>Haga click en el siguiente enlace para colocar una nueva contraseña.</p>

          <a href= "http://localhost:8000/pages/Auth/newPassword.html">Cambio de contraseña</a>
          <p>Si no solicitaste un cambio de contraseña, ignore este correo y ninguna acción será necesaria.</p>
    </div>
    
    `

  }