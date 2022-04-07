// este archivo lo uso para guardar las rutas principales
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const flash = require('connect-flash');



router.get('/', (req, res) => {
    res.render('layouts/index', {titulo: "Portfolio"});
});

router.get('/success', (req, res) => {
  res.render('partials/success', {titulo: "Portfolio"});
});

router.get("/contacto", (req, res) => {
    res.render("layouts/contacto", {titulo: "Contacto"}); // destino -vista - y variable
  
  });

router.get("/index", (req, res) => {
    res.render("layouts/index", {titulo: "Gracias"}); // destino -vista - y variable
  
});

router.get("/lenguajes", (req, res) => {
    res.render("layouts/lenguajes", {titulo: "Lenguajes"}); // destino -vista - y variable
  
  });

router.get("/proyectos", (req, res) => {
    res.render("layouts/proyectos", {titulo: "Proyectos"}); // destino -vista - y variable
  
  });

  router.post('/send-email', async (req, res, next) => {
    const { name, email, phone, message } = req.body; // para evitar poner 'req.body.name ... req.body.email ... etc

    //le damos formato html
    contentHTML = `     
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;
    require('dotenv').config();
    "use strict";
    const nodemailer = require("nodemailer");
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "cellamarematias@gmail.com", // generated ethereal user
          pass: process.env.PASSGOOGLE, // generated ethereal password
        },
      });
    
        // config del nodemailer - qué enviamos
        let info = await transporter.sendMail({
            from: '"Portfolio" <cellamarematias@gmail.com', // sender address,
            to: 'cellamarematias@gmail.com',
            subject: 'Portfolio Contact Form',
            // text: 'Hello World'
            html: contentHTML
        })
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);

    res.redirect('/success.html');
});




 

module.exports = router;
