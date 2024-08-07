const User = require("../../models/User/user");
const Commerce = require("../../models/Commerce/commerce");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Encryption = require("../../helpers/Encryption");

const {sendMail,getTemplate} = require('../../helpers/mail_config');

// Clave maestra :
const secret = process.env.secret;

const TokenConfig = require("../../helpers/generateToken");

const { Op } = require("sequelize");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "josephninahonestoypuntual@gmail.com",
    pass: "sjku joto ikpu rjvp",
  },
});

exports.generateToken = async (req, res) => {
  try {
    // Obtener usuario especifico:
    const { email, password } = req.body;
    console.log(req.body);

    let rol = "";

    const user = await User.findOne({ where: { email } });
    const commerce = await Commerce.findOne({ where: { email } });

    if (!user && !commerce) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user) {
      if (user.accountType === 1) {
        rol = "Admin";
      } else if (user.accountType === 2) {
        rol = "Cliente";
      } else {
        rol = "Repartidor";
      }
      // Verificar contraseña:
      const match = await Encryption.Compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      console.log(user.toJSON());

      const token = TokenConfig.SignToken({ Users: user.toJSON(), rol }, secret);

      user.resetToken = token;
      await user.save();

      //   Verificacion de estado:
      if (user.state===0){
        // template:
        const template = await getTemplate(user.name, token);
        
        // Verificacion de cuenta:
        await sendMail(email,"Activacion",template);

      }
      return res.status(200).send({ user:user,token: token });

    } else {
      rol = "Commerce";

      const match = Encryption.Compare(password, commerce.password);
      if (!match) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const token = TokenConfig.SignToken(
        { email, rol },
        secret
      );

      commerce.resetToken = token;
      await commerce.save();
      //   Verificacion de estado:
      if (commerce.state===0){
        
        // template:
        const template = await getTemplate(commerce.name, token);
        
        // Verificacion de cuenta:
        await sendMail(email,"Activacion",template);

      }
      return res.status(200).send({ commerce:commerce, token: token });
    }
  } catch (err) {
    console.error("getToken error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.PostReset = async (req, res, next) => {
  const email = req.body.email;

  try {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString("hex");

    const user = await User.findOne({ where: { email } });
    const commerce = await Commerce.findOne({ where: { email } });

    if (!user && !commerce) {
      return res
        .status(404)
        .json({ error: "No user or commerce found with that email." });
    }

    if (user) {
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();

    } else {
      commerce.resetToken = token;
      commerce.resetTokenExpiration = Date.now() + 3600000;
      await commerce.save();
    }

    await transporter.sendMail({
      from: "josephninahonestoypuntual@gmail.com",
      to: email,
      subject: "Reset Password Request",
      html: `
        <h3>Usted solicitó un cambio de contraseña</h3>
        <p>Haga click en el siguiente enlace para colocar una nueva contraseña.</p>
        <a href="http://localhost:8000/pages/Auth/newPassword.html">Cambio de contraseña</a>
        <p>Si no solicitaste un cambio de contraseña, ignore este correo y ninguna acción será necesaria.</p>
      `,
    });

    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred. When sending the email" });
  }
};

exports.GetNewPassword = async (req, res) => {

  const{token,NewPassword}  = req.body;

  User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: { [Op.gte]: Date.now() },
    },
  }).then((user)=>{
    
        if (user){
            user.password =  Encryption.encrypt(NewPassword); 
            user.resetToken = null;
            user.resetTokenExpiration = null;
            user.save();

            return res.status(200).json({ passwordToken: token, userId: user.id });
        }

        Commerce.findOne({
            where: {
              resetToken: token,
              resetTokenExpiration: { [Op.gte]: Date.now() },
            },
        }).then((commerce)=>{
           
            if (commerce){

                commerce.password =  Encryption.encrypt(NewPassword); // Asegúrate de usar bcrypt para hashear la nueva contraseña
                commerce.resetToken = null;
                commerce.resetTokenExpiration = null;
                commerce.save();
                return res.status(200).json({ passwordToken: token, userId: commerce.id });
            }
            return res.status(404).json({ error: "Token invalido o expirado." });

        }).catch((error)=>{
            console.error(err);
            return res.status(500).json({ error: "Error interno del servidor." });
        })
  })
};
