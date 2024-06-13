var express = require('express');
var router = express.Router();
var USER = require('../models/user');
let UserControllers = require("../controllers/user")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "sahildiyora123@gmail.com",
    pass: "ikpuhhjqkozwhajl",
  },
});

async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'sahildiyora123@gmail.com', // sender address
    to: email, // list of receivers
    subject: "HELLO !", // Subject line
    // text: "Hello world?", // plain text body
    // html: '<table border="2" cellpadding="10"><tr><td> NAME </td><td> SAHIL</td></tr><tr><td> SURNAME </td><td>DIYORA</td></tr><tr><td> FATHER NAME </td><td>SANJAY BHAI</td></tr></table>'
    // html: '<a style="color: red; font-size: 50px;" target="_blank" href="https://www.cdmi.in/">Please click here</a>', // html body
    html: '<a href="tel:+9624615910" title="PHONE KAR NE? Contact Now" class="text-white">KAM HOY TOJ PHONE KARJE ? +91 96246 15910 </a>', // html body
  });
  -
    console.log("Message sent: %s", info.messageId);
}


router.post('/signup', async function (req, res, next) {

  try {

    let QUERY_DATA = req.body;

    if (!QUERY_DATA.name || !QUERY_DATA.email || !QUERY_DATA.password || !QUERY_DATA.confirm_password) {
      throw new Error("PLESE ENTER A FIELD");
    }

    if (QUERY_DATA.password != QUERY_DATA.confirm_password) {
      throw new Error("PLESE ENTER PASS & CONFIRM PASS");
    }

    QUERY_DATA.password = await bcrypt.hash(QUERY_DATA.password, 10)

    let DATA = await USER.create(QUERY_DATA)
    console.log(DATA);

    /////////////////////////////////////////////////////////////////////////////////////////////////

    await main(QUERY_DATA.email)

    /////////////////////////////////////////////////////////////////////////////////////////////////

    res.status(201).json({
      message: "USER CREATED SUCCESSFULLY",
      Data: DATA
    })

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.post('/login', async function (req, res, next) {
  try {

    let QUERY_DATA = req.body;

    if (!QUERY_DATA.email || !QUERY_DATA.password) {
      throw new Error("PLESE ENTER FIELD");
    }

    let CHEAKUSER = await USER.findOne({ email: QUERY_DATA.email })

    if (!CHEAKUSER) {
      throw new Error("USER NOT FOUND");
    }

    const CHEAK_PASS = await bcrypt.compare(QUERY_DATA.password, CHEAKUSER.password)

    if (!CHEAK_PASS) {
      throw new Error("PASSWORD INCORRECT ... 😢");
    }

    let token = await jwt.sign({ userId: CHEAKUSER._id }, 'SURAT')

    res.status(201).json({
      message: "LOG IN SUCESSFULLY",
      token
    })

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.get('/', UserControllers.SECURE , async function (req, res, next) {

  try {

    let ALL_DATA = await USER.find();
    
    // let token = await jwt.sign({ userId: ALL_DATA._id }, 'SURAT')
    // console.log(token);

    res.status(201).json({
      message: "USERS FOUND SUCCESSFULLY",
      Data: ALL_DATA
    })

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

module.exports = router;