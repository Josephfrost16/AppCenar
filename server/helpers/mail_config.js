

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


  const sendMail = async (email,subject,html)=>{

    await transporter.sendMail({
        from: `MHCODE <${Mail.user}>`,
        to: email,
        subject,
        html
      });
  }



  const getTemplate = (name,token)=>{

  }

//   `
//           <h3>Usted solicitó un cambio de contraseña</h3>
//           <p>Haga click en el siguiente enlace para colocar una nueva contraseña.</p>
//           <a href="http://localhost:4090/api/auth/reset/${token}">Cambio de contraseña</a>
//           <p>Si no solicitaste un cambio de contraseña, ignore este correo y ninguna acción será necesaria.</p>
//         `