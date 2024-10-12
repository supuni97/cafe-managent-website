const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Signup API
router.post('/signup', (req, res) => {
  let user = req.body;
  let query = "SELECT email, password, status, role FROM user WHERE email = ?";

  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query = "INSERT INTO user(name, contactNumber, email, password, status, role) VALUES (?, ?, ?, ?, 'false', 'user')";
        connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Successfully registered" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(400).json({ message: "Email already exists." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Login API
router.post('/login', (req, res) => {
  const user = req.body;
  let query = "SELECT email, password, status, role FROM user WHERE email = ?";

  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({ message: "Incorrect username or password." });
      } else if (results[0].status === 'false') {
        return res.status(401).json({ message: "Wait for admin approval" });
      } else if (results[0].password == user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.status(200).json({ token: accessToken });
      } else {
        return res.status(400).json({ message: "Something went wrong. Please try again." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Forgot Password API
router.post('/forgotPassword', (req, res) => {
  const user = req.body;
  let query = "SELECT email, password FROM user WHERE email = ?";

  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Email not found." });
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "Password by Cafe Management System",
          html: `<p><b>Your Login details for Cafe Management System</b><br><b>Email: </b>${results[0].email}<br><b>Password: </b>${results[0].password}<br><a href="http://localhost:4200/">Click here to login</a></p>`
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to send email.", error });
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: "Password sent to your email." });
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
