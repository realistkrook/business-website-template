const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const express = require('express');
require('dotenv').config();

admin.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
});

const app = express();
app.use(cors);

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

app.use(limiter);

app.post('/submitForm', async (req, res) => {
  // Check the origin of the request
  const allowedOrigins = ['https://realists.tech'];
  const origin = req.get('origin');

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).send('Unauthorized domain');
  }

  // Verify reCAPTCHA
  const recaptchaResponse = req.body.recaptchaResponse;
  const secretKey = '6LftnDMqAAAAAEI8jfwEi4hcA24u520fnMYYYtDO';
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

  const response = await fetch(verificationUrl, { method: 'POST' });
  const verificationResult = await response.json();

  if (!verificationResult.success) {
    return res.status(400).send('reCAPTCHA verification failed');
  }

  // Get form data
  const { name, company, email, phone, message } = req.body;

  // Reference messages collection
  const messagesRef = admin.database().ref('messages');

  // Save message to Firebase
  messagesRef.push({ name, company, email, phone, message })
    .then(() => res.status(200).send('Message saved'))
    .catch(error => res.status(500).send(error));
});

exports.submitForm = functions.https.onRequest(app);