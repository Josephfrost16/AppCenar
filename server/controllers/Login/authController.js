const User = require("../../models/User/user");
const Commerce = require("../../models/Commerce/commerce");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Encryption = require("../../helpers/Encryption");

const {sendMail,getTemplate,getTemplate2} = require('../../helpers/mail_config');

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

      if (user.resetToken){
        try{
          const decoded =  TokenConfig.VerifyToken(user.resetToken);
          console.log('Decoded payload:', decoded);
        }catch(err){
          console.error('Token verification failed',err.message);
        }
      }

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
        { Commerces: commerce.toJSON(), rol },
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
      await user.save();

      const template = await getTemplate2(user.name, token);

      await sendMail(email,"Reset Password",template);
      res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
    } else {
      commerce.resetToken = token;

      const template = await getTemplate2(commerce.name, token);
      await commerce.save();

      await sendMail(email,"Reset Password",template);

      res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred. When sending the email" });
  }
};


