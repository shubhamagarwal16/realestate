const express = require('express');
const router = express.Router();
const helpers = require('../providers/helper');

const sgMail = require('@sendgrid/mail');

const sendEmail = (data) => {
  return sgMail.send(data)
}

// THIS API IS FOR MY PERSONAL USE 
router.post('/github-pages', (req, res) => {
  let errorMessage = ''
  const checkMissingKey = helpers.isKeyMissing(req.body, ['toEmail', 'fromEmail', 'name', 'email', 'message']);

  if (checkMissingKey) {
    errorMessage = `${checkMissingKey} is missing`;
  }
  else if (!process.env.SENDGRID_API_KEY) {
    errorMessage = 'Sendgrid API key not found'
  }
  else if (!process.env.SENDGRID_TEMPLATE_ID) {
    errorMessage = 'Sendgrid template not found'
  }

  if (errorMessage) {
    res.status(400).json({ message: errorMessage })
    return false
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: req.body.toEmail,
    from: req.body.fromEmail,
    template_id: process.env.SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
  };

  sendEmail(msg)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' })
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

module.exports = router;