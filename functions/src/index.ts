import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

export const sendMail = functions.https.onRequest(async (req, res) => {
  const { email, message } = req.body;
  if (!email && !message) {
    return res.status(400).send("Malformed payload.");
  }
  const mailOptions = {
    from: `Portfolio <${gmailEmail}>`,
    to: "msalanvarov@gmail.com",
    subject: `Contact message from ${email}`,
    text: `From: ${email}\n\n${message}`
  };
  return Promise.all([
    admin
      .database()
      .ref("/messages")
      .push({ email, message }),
    mailTransport.sendMail(mailOptions)
  ] as [admin.database.ThenableReference, nodemailer.SentMessageInfo])
    .then(([dbRes, emailMeta]) =>
      res.send({ database: dbRes, message: emailMeta.messageId })
    )
    .catch(err => console.error(err));
});
